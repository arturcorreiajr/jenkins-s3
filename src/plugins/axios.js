import axios from 'axios';

const baseURL = process.env.VUE_APP_BACKOFFICE_API_URL || 'https://influencers-backoffice.gotchosen.com';

export const http = axios.create({
    baseURL: `${baseURL}/api/`,
    timeout: 0,
    headers: {
        'Content-Type': 'application/json',
    },
});
