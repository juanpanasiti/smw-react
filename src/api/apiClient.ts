import axios, { AxiosResponse, isAxiosError, AxiosError } from 'axios';
import { enqueueSnackbar } from 'notistack';

const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_SMW_API}/api`,
});

// Request Interceptor
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        const newToken = response.headers['renewed-token'];
        if (newToken) {
            localStorage.setItem('token', newToken);
        }
        return response;
    },
    (error) => {
        if (isAxiosError(error)) {
            handleAxiosError(error);
        }

        return Promise.reject(error);
    }
);

const handleAxiosError = (error: AxiosError) => {
    switch (error.status) {
        case 401:
            enqueueSnackbar('Token has expired. Please, relogin', { variant: 'error' });
            break;

        default:
            enqueueSnackbar(error.message, { variant: 'error' });
            console.error(error);
            break;
    }
};

export default apiClient;
