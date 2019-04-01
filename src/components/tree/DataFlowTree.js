import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';

import QueryParagraph from '../common/QueryParagraph';
import IconLabelButtons from '../common/IconLabelButtons';

const fqurl = "http://localhost:8889";
const tenantId = "00000";

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit * 2,
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
});

function generateTreeNodes(obj) {
    const arr=[];
    const HDFSHome = obj.dataFlow.tenant.hadoopHome;
    obj.dataFlow.processors[0].dataSets.forEach((dataSet) => {
        if (dataSet.flowDirection === "O") {
            const fields = generateTreeNodesFields2(dataSet.entityCode, dataSet.fields);
            const zone = dataSet.zone.zoneName;
            arr.push({name: dataSet.entityName, key: dataSet.entityCode,
                dsgName: dataSet.dataDomain.sorSysName, dsgCode: dataSet.dataDomain.sorSysCode,
                hdfsHome: HDFSHome, zone: zone, dataSetOptions: dataSet.dataSetOptions,
                type: "dataset", children: fields
            });
        }
    });
    return arr;
}

function generateTreeNodesFields2(key, fields) {
    const arr = [];
    fields.forEach((f) => {
        arr.push({name: f.fieldName, key: `${key}-${f.fieldPosition}`, type: 'field', dataType: f.dataType, isLeaf: true, disableCheckbox: true});
    });
    return arr;
}

function generateTreeNodesFields(treeNode, obj) {
    const arr = [];
    const key = treeNode.props.eventkey;
    obj.dataFlow.processors[0].dataSets.forEach((dataSet) => {
        if (dataSet.flowDirection === "O") {
            dataSet.fields.forEach((f) => {
                arr.push({name: f.fieldName, key: `${key}-${f.fieldPosition}`, type: 'field', dataType: f.dataType, isLeaf: true, disableCheckbox: true});
            });                   
        }
    });
    return arr;
}

function setLeaf(treeData, curKey, level) {
    const loopLeaf = (data, lev) => {
        const l = lev - 1;
        data.forEach((item) => {
            if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 : curKey.indexOf(item.key) !== 0) {
                return;
            }
            if (item.children) {
                loopLeaf(item.children, l);
            } else if (l < 1) {
                item.isLeaf = true;
            }
        });
    }
    loopLeaf(treeData, level + 1);
}

function getNewTreeData(treeData, curKey, child, level) {
    const loop = (data) => {
        if (level < 1 || level > 3) return;
        data.forEach((item) => {
            if (curKey.indexOf(item.key) === 0) {
                if (item.children) {
                    loop(item.children);
                } else {
                    item.children = child;
                }
            }
        });
    }
    loop(treeData);
    setLeaf(treeData, curKey, level);
}

function getNewTreeDataL3(treeData, curKey, child, level) {
    const loop = (data) => {
        if (level < 1 || data.type === "field") return;
        data.forEach((item) => {
            if (item.type === "dataDomain" || item.type === "dataset") {
                if (item.children) {
                    loop(item.children);
                } else {
                    if (item.key === curKey)
                        item.children = child;
                }
            }
        });
    }
    loop(treeData);
    setLeaf(treeData, curKey, level);
}

function genDataDomainTree(dataFlows) {
    var treeData = [];
    if (dataFlows) {
        dataFlows.map((dataFlow) => {
            treeData.push({name: dataFlow.dataFlowName, key: dataFlow.dataFlowId, type: "dataFlow", disableCheckbox: true});
        });
    }
    return treeData;
}

class DataFlowTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: [],
            checkedKeys: [],
            paragraphs: [],
            executionPlan: {},
            kafkas: [],
        }
    }

    componentDidMount() {
        this.setState({
            treeData: genDataDomainTree(this.props.dataDomains),
            checkedKeys: []
        });
    }

    containsObject(list, obj) {
        for (var i = 0; i < list.length; i++) {
            if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
                return true;
            }
        }
        return false;
    }

    addKafka (kafka) {
        if (kafka.paragraphType != null && kafka.paragraphType === "KAFKA") {
            if (!this.containsObject(this.state.kafkas, kafka)) {
                const kafkas = [...this.state.kafkas];
                kafkas.push(kafka);
                this.setState({kafkas});
            }
        }
    }

    onSelect = (info, tree) => {
        const obj = tree.node.props.pos.split('-');
        if (obj.length != 3) {
            return;
        }
        const dd = this.state.treeData[obj[1]];
        const ddChildren = dd.children;
        const ds = ddChildren[obj[2]];

        this.props.updateWorkflow(ds.dsgName);

        let fields = ds.children;
        const paragraphs = [...this.state.paragraphs];
        const paragraph = {name: dd.name + "." + ds.name,
                            paragraphType: "HDFS",
                            dsCode: ds.key, dsName: ds.name,
                            hdfsHome: ds.hdfsHome, zone: ds.zone, dataSetOptions: ds.dataSetOptions,
                            dsgName: ds.dsgName, dsgCode: ds.dsgCode, fields: fields};
        paragraphs.push(paragraph);
        this.setState({paragraphs});
    }

    onCheck = (checkedKeys, tree) => {
        this.setState({checkedKeys});
    }

    onLoadData = (treeNode) => {
        const levelArr = treeNode.props.pos.split('-');
        const level = levelArr.length;
        return new Promise((resolve) => {
            setTimeout(() => {
                const treeData = [...this.state.treeData];
                var url = fqurl + "/api/fqmeta/getExecutionPlanByDataFlowId/" + treeNode.props.eventkey;
                if (level === 3) {
                    resolve();
                    return;
                }
                fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    if (level === 3){
                        getNewTreeDataL3(treeData, treeNode.props.eventkey, generateTreeNodesFields(treeNode, data), level);
                    }
                    else {
                        getNewTreeData(treeData, treeNode.props.eventkey, generateTreeNodes(data), level);
                    }
                    this.setState({treeData, executionPlan: data});
                    resolve();
                })
                .catch((error) => {
                    console.log("Error: " + error);
                });

            }, 500);
        });
    }

    render() {
        const loop = (data) => {
            return data.map((item) => {
                if (item.children) {
                    return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>
                }
                return (
                    <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'} />
                );
            });
        }
        const treeNodes = loop(this.state.treeData);

        if (this.props.kafka != null) {
            this.addKafka(this.props.kafka);
        }

        let added_paragraphs = this.state.paragraphs.map((data, index) => {
            return (
                <QueryParagraph index={index} data={data} noteInfo={this.state.noteInfo} />
            )
        });

        let added_kafka_paragraphs = this.state.kafkas.map((data, index) => {
            return (
                <QueryParagraph index={index} data={data} noteInfo={this.state.noteInfo} />
            )
        });

        let floatRightStyles = {
            float: "right",
            width: "80%"
        }
        let floatLeftStyles = {
            float: "left",
            width: "20%"
        }
        let clearFixStyles = {
            float: "left",
            display: "inline-block",
            width: "100%"
        } 
        
        return (
            <div style={clearFixStyles} >
                <div style={floatLeftStyles}>
                    <div style={{maxHeight: 1024, overflow: 'auto'}}>
                        <Tree
                            onSelect={this.onSelect} selectedNode={this}
                            checkable onCheck={this.onCheck} checkedKeys={this.state.checkedKeys} checkedNode={this}
                            loadData={this.onLoadData} >
                            {treeNodes}
                        </Tree>
                    </div>
                </div>
                <div style={floatRightStyles}>
                    <div>
                        <IconLabelButtons pstate={this.state} paragraphs={this.state.paragraphs} />
                    </div>
                    {added_paragraphs}
                    {added_kafka_paragraphs}
                </div>
            </div>
        )
    }
}

DataFlowTree.propsTypes = {
    classes: PropTypes.object.isRequired,
    workflow: PropTypes.object,
    updateWorkflow: PropTypes.func,
};

const mapStateToProps = state => {
    return {
        workflow: state.workflow,
        kafka: state.kafka,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateWorkflow: (workflow) => {
            dispatch({
                type: 'WORKFLOW_FETCH_DATA_SUCCESS',
                workflow
            })
        }
    }
}

export default withStyles(styles) (connect(mapStateToProps, mapDispatchToProps)(DataFlowTree));