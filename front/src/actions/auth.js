import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    UPDATE_SUCCESS,
    UPDATE_FAIL,
} from './types';

import { register, login, logout, update } from '../services/auth.service';

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

export const UpdateAction =
    (email, name, surname, password, oldpassword) => (dispatch) => {
        return update(email, name, surname, password, oldpassword).then(
            (data) => {
                console.log(data.user);
                dispatch({
                    type: UPDATE_SUCCESS,
                    payload: { user: { user: data.user, token: data.token } },
                });

                return Promise.resolve();
            },
            (error) => {
                console.log(error.response.data.message);
                const message = error.response.data.message;

                dispatch({
                    type: UPDATE_FAIL,
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
