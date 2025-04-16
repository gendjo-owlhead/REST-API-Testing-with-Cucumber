import axios, { AxiosRequestConfig, AxiosError } from 'axios';

const DEFAULT_TIMEOUT = 10000; // 10 seconds

export const apiRequest = async (url: string, method: string = 'GET', body?: any) => {
    console.log(`Making ${method} request to: ${url}`);
    if (body) {
        console.log('Request body:', JSON.stringify(body, null, 2));
    }

    try {
        const config: AxiosRequestConfig = {
            method,
            url,
            timeout: DEFAULT_TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
            },
            data: body,
            validateStatus: (status) => true // Don't throw on any status
        };

        const response = await axios(config);
        console.log(`Response status: ${response.status}`);
        console.log('Response data:', JSON.stringify(response.data, null, 2));
        
        return {
            status: response.status,
            data: response.data
        };
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error('Request failed:', {
            message: axiosError.message,
            code: axiosError.code,
            response: axiosError.response?.data
        });
        throw error;
    }
};

export const getObjects = async () => {
    return await apiRequest('https://api.restful-api.dev/objects');
};