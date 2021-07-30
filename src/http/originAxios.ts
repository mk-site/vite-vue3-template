/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios';

const source = axios.CancelToken.source();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createAxiosHttp = (_config: {} = {}, baseURL = '/') => {
    const axiosParams = {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json;charset=utf-8',
            Accept: 'application/json;version=3.0;compress=false;',
        },
        ..._config,
        timeout: 500000,
        baseURL,
    };
    const fetch = axios.create(axiosParams);
    fetch.interceptors.request.use(
        (config) => {
            config.headers = {
                ...config.headers,
                'content-type': 'application/json',
            };
            return config;
        },
        (error) => Promise.reject(error),
    );
    fetch.interceptors.response.use(
        (response) => {
            if (response.status === 200) {
                const { data } = response;
                const { error } = data || {};
                if (data.success) {
                    return data.data;
                }
                if (error) {
                    source.cancel();
                    return Promise.reject({
                        message: error?.message || '',
                        code: '',
                    });
                }
                return data.data;
            }
            return response;
        },
        (error: any) => {
            const defaultMessage = '网络错误 稍后再试';
            // eslint-disable-next-line no-underscore-dangle
            if (error.__CANCEL__) {
                return;
            }
            return Promise.reject({
                message: (error && error.message) || defaultMessage,
                code: null,
            });
        },
    );
    return fetch;
};
export default createAxiosHttp();
