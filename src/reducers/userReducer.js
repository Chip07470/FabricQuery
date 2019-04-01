import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function user(state=initialState, action) {
    switch (action.type) {
        case 'USER_LOGIN_SUCCESS': 
            return Object.assign({}, state, {
                login: true,
            });
        default:
            return state;
    }
}
