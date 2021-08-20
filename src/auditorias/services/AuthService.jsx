// import axios from 'axios';
import api from "../data/api";

// const baseURL = 'http://localhost/api';

export const AuthService = {
    login: (validationData) => {
        return api.post(`/login/login`, validationData);
    },
    logout: () => {
        return api.post(`/login/logout`);
    },
};