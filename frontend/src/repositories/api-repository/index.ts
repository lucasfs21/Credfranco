import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export default class APIRepository {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: "http://localhost/api"
        });

        this.client.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("token");
                if (token)
                    config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
                return config;
            },
            (error) => {
                return false;
            },
        );

        this.client.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            (error: any) => {
                throw error;
            },
        );
    }

    protected get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.get<T>(url, config);
    }

    protected post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.post<T>(url, data, config);
    }

    protected put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.put<T>(url, data, config);
    }

    protected delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.delete<T>(url, config);
    }
}
