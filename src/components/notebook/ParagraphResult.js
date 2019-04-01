import React, { Component } from  'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { paragraphResultPopulateData } from '../../actions/paragraphResult'
import fqRestApiConstants from '../../constants';

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

class ParagraphResult extends Component {

    render () {
        <div>
            ... <p>{this.props.ParagraphResult}</p>
        </div>
    }
}

ParagraphResult.propTypes = {
    populateData: PropTypes.func.isRequired,
    paragraphResult: PropTypes.object.isRequired,
    hasErrored: PropTypes.bool,
    isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        paragraphResult: state.paragraphResult,
        hasErrored: state.paragrapResultHasErrored,
        isLoading: state.paragraphResultIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        populateData: (url) => dispatch(paragraphResultPopulateData(url)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ParagraphResult);