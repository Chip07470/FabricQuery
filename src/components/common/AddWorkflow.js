import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { store } from '../../index';
import { updateWorkflow, getWorkflow } from '../../actions/workflow';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import classNames from 'classnames';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    textField: {
        flexBasis: 200,
    },
});

let inlineStyle = {
    display: 'inline-block',
    float: 'left'
}

class AddWorkflow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            workflow: Object.keys(props.workflow).length > 0 ? props.workflow : '',
            weight: '',
            weightRange: '',
            showEdit: false
        };
    }
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value});
        updateWorkflow(event.target.value);
    };

    handleClickShowEdit = () => {
        this.setState(state => ({showEdit: !state.showEdit}));
    }

    componentDidMount(){
        store.subscribe(() => {
            const name = getWorkflow();
            this.setState({workflow: name.workflow});
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root} style={inlineStyle}>
                <TextField
                    id="outline-adornment-workflow"
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    type="text"
                    disabled={this.state.showEdit}
                    label="Workflow"
                    value={this.state.workflow}
                    onChange={this.handleChange('workflow')}
                    Inputprops={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton aria-label="Toggle workflow visibility" onCLick={this.handleClickShowEdit}></IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
        );
    }
}

AddWorkflow.propTypes = {
    classes: PropTypes.object.isRequired,
    workflow: PropTypes.object,
}

const mapStateToProps = state => {
    return {
        workflow: state.workflow
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateWorkflow: (workflow) =>
            dispatch({
                type: 'WORKFLOW_FETCH_DATA_SUCCESS',
                workflow
            })
    }
}

export default withStyles(styles) (connect (mapStateToProps, mapDispatchToProps)(AddWorkflow));