import React, { Component } from  'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class NotebookList extends Component {

}

NotebookList.propTypes = {

}

const mapStateToProps = (state) => {
    return {

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export const zurl = 'http://localhost:8889/api/note/';
export default connect(mapStateToProps, mapDispatchToProps)(NotebookList);