import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/auth/';

export const register = (email, name, surname, password) => {
    return axios
        .post(API_URL + 'register', {
            email,
            name,
            surname,
            password,
        })
        .then((response) => {
            if (response.data.User) {
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.User)
                );
            }
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
            if (response.data.User) {
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.User)
                );
            }
            return response.data;
        });
};

export const update = (email, name, surname, password, oldpassword) => {
    return axios
        .put(
            'http://localhost:3000/api/users/updatewithtoken',
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
            if (response.data.user) {
                let user = JSON.parse(localStorage.getItem('user'));
                let token = user.token;
                localStorage.removeItem('user');
                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        user: response.data.user,
                        token: token,
                    })
                );

                return { ...response.data, token: token };
            }
            return response.data;
        });
};

export const logout = () => {
    localStorage.removeItem('user');
};
