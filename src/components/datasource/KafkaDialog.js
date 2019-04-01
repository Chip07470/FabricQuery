import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import {withStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import {getKafkaTopics} from '../../actions/kafka';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 250,
    },
    intField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 50,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    }
});

class KafkaDialog extends React.Component {
    constructor (props) {
        super(props);
        this.onImpersonation = this.onImpersonation.bind(this);
        this.onAddConnProp = this.onAddConnProp.bind(this);

        this.state = {
            open: true,
            name: '',
            checkedImp: true,
            connProps: [],
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };    
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    onImpersonation() {
        this.setState({checkedImp: !this.state.checkedImp});
    }
    onAddConnProp() {
        const pair = {name:"", value: ""};
        this.setState({connProps: [...this.state.connProps, pair]});
    }

    render () {
        const { fullScreen } = this.props;
        if (!this.props.show) {
            return null;
        }

        const renderConnProps = (
            <div>
                {this.state.connProps.map((connProp, index) => 
                    <div>
                        <TextField
                            id="conn-prop-name"
                            label="Name"
                            className={styles.textField}
                            defaultValue=""
                            onChange={this.handleChange('rootPath')}
                            margin="normal"
                        /> &nbsp;
                         <TextField
                            id="conn-prop-value"
                            label="Value"
                            className={styles.textField}
                            defaultValue=""
                            onChange={this.handleChange('rootPath')}
                            margin="normal"
                        />                     
                    </div>
                )}
            </div>
        )

        return (
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                    disableBackdropClick={true}
                >
                    <DialogTitle id="responsive-dialog-title">{"HDFS Source"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <form className={styles.container} noValidate autoComplete="off">
                                <TextField
                                    id="hdfs-name"
                                    label="Name"
                                    className={styles.textField}
                                    value={this.state.hdfsName}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                /> <br />
                                <TextField
                                    required
                                    id="host-required"
                                    label="NaHostme"
                                    className={styles.textField}
                                    defaultValue="localhost"
                                    margin="normal"
                                /> <br />
                                <TextField
                                    required
                                    id="port-required"
                                    label="Port"
                                    className={styles.intField}
                                    defaultValue="8020"
                                    margin="normal"
                                /> <br />
                                <Checkbox
                                    label="Impersonation"
                                    checked={this.state.checkedImp}
                                    tabIndex={-1}
                                    disableRipple
                                    onClick={this.onImpersonation}
                                /> 
                                Impersonation? &nbsp;
                                <TextField
                                    id="root-path"
                                    label="Root Path"
                                    className={styles.textField}
                                    defaultValue="/"
                                    onChange={this.handleChange('rootPath')}
                                    margin="normal"
                                /> <br />
                                <Divider light={true} />
                                Connection Properties &nbsp; <AddCircleIcon onClick={this.onAddConnProp} />
                                {renderConnProps}
                            </form>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onClose} color="primary">Cancel</Button>
                        <Button onClick={this.props.onClose} color="primary" autoFocus>Save</Button>
                   </DialogActions>
                </Dialog>
            </div>
        );

    }

}


KafkaDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    connProps: PropTypes.object,
}

const mapStateToProps = state => {
    return {
        topics: state.topics,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        updateKafka: (kafka) =>
            dispatch({
                type: 'KAFKA_DATA_SOURCE_FETCH_DATA_SUCCESS',
                kafka
            })
    };
}

export default withStyles(styles) (connect (mapStateToProps, mapDispatchToProps)(KafkaDialog));