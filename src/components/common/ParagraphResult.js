import React, { Component } from  'react';
import PropTypes from 'prop-types';
import ParagraphTable from '../notebook/ParagraphTable';
import { ListGroup, ListGroupItem, Alert } from 'reactstrap';
import OneParagraph from './OneParagraph';
import { fqRestApiConstants } from '../../constants';

function onRun(e) {
    if (this.state.intervalId === null) {
        const iv = setInterval(this.getNoteInfo, 2000);
        this.setState({intervalId: iv});
    }

    fetch (fqRestApiConstants.ZURL + "notebook/job/" + this.state.noteId, {
        method: 'post'
    })
    .then((response) => response.json())
    .then ((data) => {

    })
    .catch((error) => {
        
    })
}

function onDelete(e) {
    fetch (fqRestApiConstants.ZURL + "notebook/" + this.state.noteId, {
        method: 'delete'
    })
    .then((response) => response.json())
    .then ((data) => {

    })
    .catch((error) => {
        
    })
}

function onSave(e) {

}

function onChange(e) {

}

let ParagraphResult = ({title, paraInfo}) => {
    const hasMsg = paraInfo != null && paraInfo.body != null && paraInfo.body.paragraphs != null;
    if (!hasMsg)
        return null;
    return (
        paraInfo.body.paragraphs.map( (paragraph, i) => (
            <OneParagraph noteInfo={paraInfo} results={paragraph.results===null ? [] : paragraph.results} ptext={paragraph.text} paragraph={paragraph} />

        ))
    );
}

ParagraphResult.propTypes = {
    title: PropTypes.string.isRequired,
    paraInfo: PropTypes.object.isRequired,
};

export default ParagraphResult;