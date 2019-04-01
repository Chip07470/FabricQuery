import React, { Component } from  'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { paragraphsFetchData, paragraphDetail } from '../../actions/paragraphs'

const divStyle = {
    paddingBottom: '6px',
}

class ParagraphList extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){}

    componentDidCatch(error, info) {
        this.setState({hasErrored: true});
        console.log(info);
    }

    onChange (e) {

    }

    render () {
        if (this.props.paragraphsObj.paragraphs) {
            return (
                <div>
                    <h2>{this.props.notebook.label}</h2>

                </div>
            );
        }

    }
}

ParagraphList.propTypes = {
    fetchData: PropTypes.func.isRequired,
    paragraphs: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        notebook: state.notebook,
        paragraphs: state.paragraphs,
        paragraphsObj: state.paragraphsObj,
        hasErrored: state.paragrapsHasErrored,
        isLoading: state.paragraphsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(paragraphsFetchData(url)),
        paragraphDetail: (e) => dispatch(paragraphDetail(e))
    };
};

export function getParagraphs (url) {
    this.props.fetchData(url);
}

export default connect(mapStateToProps, mapDispatchToProps)(ParagraphList);