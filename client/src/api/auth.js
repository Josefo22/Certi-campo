import axios from './axios';

export const loginRequest = user => axios.post(`/api/auth/login`, user);

export const verifyToken = (token) => axios.get(`/api/auth/verify`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});