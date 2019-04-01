import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from '../actions/alertActions';
import { history } from '../helpers/history';
import toastr from 'toastr';

export const userActions = {
    login,
    logout,
    delete: _delete
}

function login(user) {
    return dispatch => {
        userService.login(user.username, user.password, user.tenantId)
        .then(
            user => {
                dispatch({type: 'USER_LOGIN_SUCCESS'});
                history.push('/');
                toastr.info("Login successfully");
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
                toastr.error("Login failed");
            }
        );
    }
    function success(user) { return {type: userConstants.LOGIN_SUCCESS, user}; }
    function failure(error) { return {type: userConstants.LOGIN_FAILURE, error}; }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

//prefixed function name with underscope since delete is a reserved word in js
function _delete(id) {

}
