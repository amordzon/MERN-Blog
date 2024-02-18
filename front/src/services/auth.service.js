import axios from 'axios';
import authHeader from './auth-header';
const API_URL = `${process.env.REACT_APP_API}/api/auth/`;

export const register = (email, name, surname, password) => {
    return axios
        .post(API_URL + 'register', {
            email,
            name,
            surname,
            password,
        })
        .then((response) => {
            return response.data;
        });
};

export const login = (email, password) => {
    return axios
        .post(API_URL + 'login', {
            email,
            password,
        })
        .then((response) => {
            return response.data;
        });
};

export const update = (email, name, surname, password, oldpassword) => {
    return axios
        .put(
            `${process.env.REACT_APP_API}/api/users/update/updatewithtoken`,
            {
                email,
                name,
                surname,
                password,
                oldpassword,
            },
            {
                headers: authHeader(),
            }
        )
        .then((response) => {
            return response.data;
        });
};
