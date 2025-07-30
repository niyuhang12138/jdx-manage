import axios, {
    type AxiosInstance,
    type AxiosInterceptorOptions,
    type AxiosRequestConfig,
    type AxiosResponse,
    type CreateAxiosDefaults,
} from 'axios';

class Request {
    private instance: AxiosInstance;
    constructor(options?: CreateAxiosDefaults) {
        this.instance = axios.create(options);
    }

    setRequestInterceptors(
        onFulfilled?: (
            value: import('axios').InternalAxiosRequestConfig,
        ) =>
            | import('axios').InternalAxiosRequestConfig
            | Promise<import('axios').InternalAxiosRequestConfig>,
        onRejected?: ((error: any) => any) | null,
        options?: AxiosInterceptorOptions,
    ): number {
        return this.instance.interceptors.request.use(onFulfilled, onRejected, options);
    }

    setResponseInterceptors<T = any>(
        onFulfilled?:
            | ((response: AxiosResponse<T>) => AxiosResponse<T> | Promise<AxiosResponse<T>>)
            | null,
        onRejected?: ((error: any) => any) | null,
    ): number {
        return this.instance.interceptors.response.use(onFulfilled, onRejected);
    }

    request<D, T>(config: AxiosRequestConfig<D>): Promise<AxiosResponse<T, D>> {
        return this.instance.request<T, AxiosResponse<T, D>, D>(config);
    }

    get<D, T>(url: string, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<T, D>> {
        return this.instance.get<T, AxiosResponse<T, D>, D>(url, config);
    }

    post<D, T>(url: string, data: D, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<T, D>> {
        return this.instance.post<T, AxiosResponse<T, D>, D>(url, data, config);
    }

    put<D, T>(url: string, data: D, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<T, D>> {
        return this.instance.put<T, AxiosResponse<T, D>, D>(url, data, config);
    }

    delete<D, T>(url: string, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<T, D>> {
        return this.instance.delete<T, AxiosResponse<T, D>, D>(url, config);
    }
}

export default Request;
