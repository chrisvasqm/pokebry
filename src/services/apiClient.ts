import axios from "axios";

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

    getAll = () =>
        instance.get<FetchResponse<T>>(`${this.endpoint}`)
            .then(response => response.data.results);

    find = (url: string) =>
        instance.get<T>(url)
            .then(response => response.data);

}

export default APIClient;