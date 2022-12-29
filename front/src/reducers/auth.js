import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    UPDATE_SUCCESS,
    UPDATE_FAIL,
} from '../actions/types';
import jwt_decode from 'jwt-decode';

const user = JSON.parse(localStorage.getItem('user'));
const jwt_decoded = user ? jwt_decode(user.token) : null;
const dateNow = new Date();
const initialState =
    user && jwt_decoded.exp > dateNow.getTime() / 1000
        ? { isLoggedIn: true, user }
        : { isLoggedIn: false, user: null };
if (
    localStorage.getItem('user') &&
    jwt_decoded.exp < dateNow.getTime() / 1000
) {
    localStorage.removeItem('user');
}
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };

        case UPDATE_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case UPDATE_FAIL:
            return {
                ...state,
                isLoggedIn: true,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}
