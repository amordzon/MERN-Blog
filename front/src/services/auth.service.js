import axios from 'axios';

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

export const logout = () => {
    localStorage.removeItem('user');
};
