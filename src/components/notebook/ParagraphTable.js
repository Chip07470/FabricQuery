import React, { Component } from  'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { paragraphTablePopulateData } from '../../actions/paragraphTable'
import { Table } from 'reactstrap';
import IconResultWF from '../common/IconResultWF';

class ParagraphTable extends Component { 
   render () {
        if (this.props.hasErrored) {
            return <p>Error occurred.</p>
        }
        if (this.props.isLoading) {
            return <p>Loading...</p>
        }

        var theader = this.props.paragraphTable.split('\n')[0].split('\t').map((col, index) => {
            return <th>{col}</th>;
        });

        function parseColumn(row, index) {
            let allCols = [];
            if (index > 0) {
                row.split('\t').map((col) => {
                    allCols = allCols.concat(<td>{col}</td>);
                });
            }
            return allCols;
        }

        let allRows = [];
        this.props.paragraphTable.split('\n').map((row, index) => {
            return (index > 0) ? allRows = allRows.concat(<tr key={index}> {parseColumn(row,index)} </tr>) : null;
        });

        return (
            <div className="table">
                <IconResultWF />
                <Table size="sm" responsive>
                    <thead>
                        <tr>
                            {theader}
                        </tr>
                    </thead>
                    <tbody>
                        {allRows}
                    </tbody>
                </Table>
            </div>
        );
    }
}

ParagraphTable.propTypes = {
    paragraphTable: PropTypes.string.isRequired,
    hasErrored: PropTypes.bool,
    isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        paragraphTable: state.paragraphTable,
        hasErrored: state.paragrapResultHasErrored,
        isLoading: state.paragraphResultIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        populateData: (url) => dispatch(paragraphTablePopulateData(url)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ParagraphTable);