import React from 'react';
import { PropTypes } from 'prop-types';
import Header from './common/Header';
import { connect } from 'react-redux';
import Footer from './Footer';

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Header loading={this.props.loading} />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object,
    loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        loading: state.ajaxCallsInProgress > 0
    };
}

export default connect(mapStateToProps)(App);