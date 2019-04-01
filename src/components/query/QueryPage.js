import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

import { initLoadDataDomain } from '../../actions/dataDomains';
import { hdfsClick, loadDataDomains, dataDomainsFetchData, dataDomainDetail } from '../../actions/dataDomains';
import { loadDataSets, dataSetDetail } from '../../actions/dataSets';

//import TopNav from '../navigation/TopNav';

import DataFlowTree from '../tree/DataFlowTree';
import QueryEngine from '../common/QueryEngine';
import AddWorkflow from '../common/AddWorkflow';

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit * 2,
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
    root: {
        display: 'flex',
        flexFlow: 'column',
        height: '100%',
    },
    content: {
        flex: '1',
        display: 'flex',
    },
    sidebar: {
        flex: '0 320px'
    },
    mainContent: {
        flex: '1'
    },
    utilityNav: {
        height: '100%',
        marginRight: '24px'
    },
    '@media (max-width:960px)': {
        sidebar: {
            display: 'none'
        }
    }
});

function onTextInputChange(){}
function onChange(){}
function onSave(){}

class QueryPage extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            saving: false,
        }
    }

    componentDidMount() {
        initLoadDataDomain();
    }

    _onRowSelection(key) {
        console.log(key, this.state.data[key]);
    }

    toggle() {
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        if (this.props.hasErrored) {
            return <p>There was an error loading the query</p>
        }
        if (this.props.isLoading) {
            return <p>Loading...</p>
        }
        let floatRightStyles = {
            float: "right",
            width: "50%"
        }
        let floatLeftStyles = {
            float: "left",
            width: "50%"
        }
        let clearFixStyles = {
            float: "left",
            display: "inline-block",
            width: "100%"
        }
        return (
            <div style={clearFixStyles}>
                <div style={floatLeftStyles}>
                    <Button onClick={hdfsClick} variant="fab" color="default" aria-label="HDFS" className={styles.fab}>HDFS</Button>&nbsp;
                    <Button variant="fab" color="primary" aria-label="Kafka" className={styles.fab}>Kafka</Button>&nbsp;
                    <Button variant="fab" color="primary" aria-label="Dremio" className={styles.fab}>Dremio</Button>&nbsp;
                    <Button variant="fab" color="secondary" aria-label="Hive" className={styles.fab}>Hive</Button>&nbsp;
                </div>
                <div style={floatRightStyles}>
                    <AddWorkflow />
                    <QueryEngine />
                </div>
                <DataFlowTree dataDomains={this.props.dataDomains} dataDomain={this.props.dataDomain} />
            </div>
        )
    }

}

QueryPage.propTypes = {
    fetchData: PropTypes.func.isRequired,
    dataDomains: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool,
    isLoading: PropTypes.bool,
    dataDomainDetail: PropTypes.func,
    hdfsClick: PropTypes.func,
    loaddataDomains: PropTypes.func,
    dataSets: PropTypes.array,
    loadDataSets: PropTypes.func,
    dataDomain: PropTypes.object,
    dataSet: PropTypes.object,
    fields: PropTypes.object,

    tableHeaderColor: PropTypes.oneOf(['warning','primary','danger','success','info','rose','gray']),
    tableHead: PropTypes.arrayOf(PropTypes.string),
    tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

const mapStateToProps = (state) => {
    return {
        dataDomains: state.dataDomains,
        hasErrored: state.hasErrored,
        isLoading: state.isLoading,
        dataSets: state.dataSets,
        dataDomain: state.dataDomain,
        dataSet: state.dataSet,
        fields: state.fields,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(dataDomainsFetchData(url)),
        dataDomainDetail: (e) => dispatch(dataDomainDetail(e)),
        hdfsClick: (e) => dispatch(hdfsClick(e)),
        loadDataDomains: (e) => dispatch(loadDataDomains(e)),
        loadDataSets: (e) => dispatch(loadDataSets(e)),
    };
};

export function getDataDomains (url) {
    this.props.fetchData(url);
}

export default connect(mapStateToProps, mapDispatchToProps)(QueryPage);