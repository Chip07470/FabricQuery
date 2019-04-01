import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import LeftNav from '../navigation/LeftNav';
import NotebookList from '../notebook/NotebookList';
import NotebookTable from '../notebook/NotebookTable';
import ParagrapList from '../notebook/ParagraphList';

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

class Workflows extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
        };
    }
    toggle() {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        let floatRightStyles = {
            float: "right",
            width: "100%"
        }
        let floatLeftStyles = {
            float: "left",
            width: "100%"
        }
        let clearFixStyles = {
            float: "left",
            display: "inline-block",
            width: "100%",
            overflow: "auto",
            maxHeight: "1024px",
        }
        return (
            <div>
                {this.props.notebookShow ? <NotebookTable /> 
                    : <ParagrapList ref={(paragraphList) => {this._paragraphList = paragraphList;}} />
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        notebooksShow: state.notebooksShow,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workflows);