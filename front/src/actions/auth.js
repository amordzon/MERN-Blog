import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
} from './types';

import { register, login, logout } from '../services/auth.service';

export const RegisterAction =
    (email, name, surname, password) => (dispatch) => {
        return register(email, name, surname, password).then(
            (response) => {
                dispatch({
                    type: REGISTER_SUCCESS,
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: response.data.message,
                });

                return Promise.resolve();
            },
            (error) => {
                const message = error.response.data.message;

                dispatch({
                    type: REGISTER_FAIL,
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });

                return Promise.reject();
            }
        );
    };

export const LoginAction = (email, password) => (dispatch) => {
    return login(email, password).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data.User },
            });
            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data.message;

            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const LogoutAction = () => (dispatch) => {
    logout();
    dispatch({
        type: LOGOUT,
    });
};
