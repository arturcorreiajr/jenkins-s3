import axios from 'axios';

const baseURL = process.env.VUE_APP_BACKOFFICE_API_URL || 'https://influencers-backoffice.gotchosen.com';

const axiosInstance = axios.create({
    baseURL: `${baseURL}/api/`,
    timeout: 0,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
        if (process.browser && localStorage.getItem('user')) {
            const token = JSON.parse(localStorage.getItem('user')).token;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

export default axiosInstance;
