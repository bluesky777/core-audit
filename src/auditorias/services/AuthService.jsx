import axios from 'axios';

const baseURL = 'http://localhost/api';

export const AuthService = {
    login: (validationData) => {
        return axios.post(`${baseURL}/login`, validationData);
    },
    logout: () => {
        return axios.post(`${baseURL}/logout`);
    },
};