import axios from 'axios';

// import { SERVER_URL } from './utils/constants';

const instance = axios.create({
    baseURL: 'https://api-wather.plutus-fin.ru',
    headers: {
        'Content-Type': 'application/json',
    },
    //withCredentials: true,
});

instance.interceptors.request.use((config) => {
    const authToken = localStorage.getItem('api_token');

    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
});

export default instance;
