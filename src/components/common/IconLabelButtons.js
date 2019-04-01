import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import toastr from 'toastr';

import {zurl} from '../../components/notebook/NotebookList';
import {genSpark} from './QueryParagraph';
import {createANewNote} from '../../actions/notebooks';

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

class IconLabelButtons extends React.Component {
    constructor(props) {
        super(props);
         this.state = {
            noteId: null,
            noteInfo: null,
            intervalId: null,
            inProgress: false,
            isOpenDremio: false,
        };

        this.onSave = this.onSave.bind(this);

        this.toggleDremioModal = this.toggleDremioModal.bind(this);
    }

    toggleDremioModal = (e) => {
        this.setState({isOpenDremio: !this.state.isOpenDremio});
    }

    inProgress(b) {
        this.setState({inProgress: b});
    }

    // createANewNote (data) {
    //     fetch (zurl + "/notebook", {
    //         method: 'post',
    //         body: JSON.stringify(data)
    //     })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         this.setState({noteId: data.body});
    //         toastr.info(data.body);
    //     })
    //     .catch((error) => {
    //         toastr.error(error);
    //     });
    // }

    onSave(e) {
        this.inProgress(true);
        const paragraphs = this.props.pstate.paragraphs;
        let nbObj = {name: this.props.workflow.workflow};
        let pObjs = [];
        paragraphs.map ((data,index) => {
            const pObj = {title: data.name, text: genSpark(data)};
            pObjs.push(pObj);
        });
        this.props.pstate.kafkas.map ((data, index) => {
            const pObj = {title: data.name, text: genSpark(data)};
            pObjs.push(pObj);
        });
        nbObj.paragraphs = pObjs;
        this.createANewNote(nbObj);
        this.inProgress(false);
    }

    render() {
        return (
            <div>
HOME
            </div>
        )
    }
}

IconLabelButtons.propTypes = {
    classes: PropTypes.object.isRequired,
    pstate: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
    return {
        workflow: state.workflow
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default withStyles(styles) (connect (mapStateToProps, mapDispatchToProps)(IconLabelButtons));