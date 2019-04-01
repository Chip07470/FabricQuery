import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import toastr from 'toastr';
import Tooltip from '@material-ui/core/Tooltip';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import InfoIcon from '@material-ui/icons/Info';
import { Alert } from 'reactstrap';
import ParagraphTable from '../notebook/ParagraphTable';
import { fqRestApiConstants } from '../../constants';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

class OneParagraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.ptext,
            results: this.props.results,
            noteId: this.props.noteInfo.body.id,
            paragraphId: this.props.paragraph.id,
            inProgress: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onRun = this.onRun.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    inProgress(b) {
        this.setState({inProgress: b});
    }

    onChange(e) {
        this.setState({value: e.target.value});
    }

    onSave(e) {
        this.inProgress(true);
        let data = {"title": "Paragraph insert revised", "text": this.state.value};

        fetch (fqRestApiConstants.ZURL + "notebook/" + this.state.noteId + "/paragraph", {
            method: 'post',
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then ((data) => {
            this.setState({paragraphId: data.body});
            this.inProgress(false);    
        })
        .catch((error) => {
            console.log("Error: " + error);
            this.inProgress(false);            
        })
    }

    onRun(e) {
        this.inProgress(true);
        let data = {};

        fetch (fqRestApiConstants.ZURL + "notebook/run/" + this.state.noteId + "/" + this.state.paragraphId, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then ((data) => {
            this.setState({results: data.body});
            toastr.info(data.body.code);
            this.inProgress(false);    
        })
        .catch((error) => {
            console.log("Error: " + error);
            this.inProgress(false);            
        })
    }

    onDelete(e) {
    }

    render() {
        const { classes } = this.props;
        let showWFToolbar = 
            <div>
                <Tooltip title="Run" >
                    <PlayArrowIcon onClick={this.onRun} />
                </Tooltip>
                <Tooltip title="Info" >
                    <InfoIcon onClick={this.onInfo} />
                </Tooltip>
                <Tooltip title="Delete" >
                    <PlayArrowIcon onClick={this.onDelete} />
                </Tooltip>
                <Tooltip title="Save" >
                    <InfoIcon onClick={this.onSave} />
                </Tooltip>
            </div>
        return (
            <div>
                { showWFToolbar }
                <textarea key={this.state.paragraphId}
                    className="textarea"
                    autoFocus={true}
                    onChange={this.onChange}
                    value={this.state.value}
                    style={{"border":"none", "borderLeft": "2px solid grey", "width": "100%"}}
                />
                <div key={'div' + this.state.paragraphId}>
                    { (this.state.results != null && this.state.results.msg != null) ? 
                        this.state.results.msg.map((m, idx) => (
                            (m.type === "TEXT") ?
                                <textarea key={"dta" + this.state.paragraphId}
                                    className="textarea"
                                    autoFocus={false}
                                    value={m.data}
                                    style={{"border":"none"}}
                                />
                            : (m.type === "TABLE") ? <ParagraphTable paragraphTable={m.data} key={'pt'+this.state.paragraphId} />
                            : (m.type === "HTML") ? <div dangerouslySetInnerHTML={{__html: m.data}} key={'htm'+this.state.paragraphId} />
                            : <Alert color="danger"  key={'ale'+this.state.paragraphId}> {m.data} </Alert>                         
                        ))
                      : null
                    }
                </div>
            </div>
        )
    }
}

OneParagraph.propTypes = {
    noteId: PropTypes.string,
    results: PropTypes.array,
}

export default withStyles(styles) (OneParagraph);