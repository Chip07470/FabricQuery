import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom';
import toastr from 'toastr';
import { store } from '../../../src/index';
import { userActions } from '../../actions/userActions';
import { userService } from '../../services';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        store.dispatch(userActions.logout());

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    state = {
        username: '',
        password: '',
        tenantId: '00000',
        submitted: false
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const user = this.state;
        if (user.username.length > 0 && user.password.length > 0) {
            store.dispatch(userActions.login(user));
        }
    }

    goBack() {
        this.props.history.goBack();
    }

    render() {
        const username = this.state.username;
        const password = this.state.password;
        const submitted = this.state.submitted;
        const { from } = this.props.location.state || {from: { pathname: "/"}}
        if (this.props.login) {
            return <Redirect to={from} />;
        }
        return (
            <div>

            </div>
        )
    }
}

LoginPage.propTypes = {
    login: PropTypes.object.isRequired,
    userLogin: PropTypes.func
}

const mapStateToProps = state => {
    return {
        login: state.user.login
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userLogin: () => dispatch({ type: 'USER_LOGIN' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);