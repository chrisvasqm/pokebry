import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
});

interface FetchResponse<T> {
    results: T[]
}

class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = (config?: AxiosRequestConfig) =>
        instance.get<FetchResponse<T>>(`${this.endpoint}`, config)
            .then(response => response.data.results);

    find = (url: string) =>
        instance.get<T>(url)
            .then(response => response.data);

    get = (id: number) =>
        instance.get<T>(`${this.endpoint}/${id}`)
            .then(response => response.data);

}

export default APIClient;