import React from 'react';
import { PropTypes} from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { store } from '../../index';
import HomePage from '../../components/home/HomePage';
import LoginPage from '../../components/auth/LoginPage';

function renderContent({getTabContentProps, index, value}) {
    const Content = "div";

    return (
        <Content
            {...getTabContentProps({ style: { textDecoration: 'underline' }})}
            index={index}
        />
    );
}

function onLogin(e) {
    return (<Redirect to='/login' />);
}

const Header = ({loading}) => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={LoginPage} />
            </div>
        </Router>
    );
}

Header.propTypes = {
    loading: PropTypes.bool.isRequired
}

export default Header;