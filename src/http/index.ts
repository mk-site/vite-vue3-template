// import { message } from 'ant-design-vue';
import axiosHttp, { createAxiosHttp } from './originAxios';

const message = {
    error(msg: string) {
        console.error(msg);
    }
};

type IOptions = {
    hideError?: boolean;
    loading?: boolean;
    instance?: boolean;
    instanceConfig?: any;
};

type IHttpFn = {
    <T>(
        url: string,
        params?: any,
        options?: {
            hideError?: boolean;
            loading?: boolean;
            instance?: boolean;
            instanceConfig?: any;
        },
    ): Promise<T>;
};

type THttp = Record<TMethods, IHttpFn>;
type TMethods = 'get' | 'post' | 'delete' | 'put';
const methods = ['get', 'post', 'delete', 'put'];

const defaultOptions = {
    hideError: false, // 隐藏错误，默认内部展示错误信息
    loading: false, // 是否展示loading
    instance: false, // 是否需要实例，每次请求都返回一个新的实例
    instanceConfig: {}, // 实例配置
};

const http: THttp = methods.reduce((map: any, method: string) => {
    map[method] = (url: string, params?: any, options?: IOptions, config?: any) => {
        const optionsData = { ...defaultOptions, ...(options || {}) };
        const { instance, hideError, instanceConfig } = optionsData;
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (instance ? createAxiosHttp(instanceConfig) : axiosHttp)[method](url, params, config).then(
                (res: unknown) => {
                    resolve(res);
                },
                (e: { message: string; code: string }) => {
                    if (!hideError && e && e.message) {
                        message.error(e.message);
                    }
                    console.error(url, e && e.message);
                    reject(e);
                },
            );
        });
    };
    return map;
}, {});

export default http;
