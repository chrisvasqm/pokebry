import axios from "axios";

const instance = axios.create({
    baseURL: 'https://pokeapi.co/api'
});

class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    find = (id: number) => {
        return instance.get<T>(`${this.endpoint}/${id}`)
            .then(response => response.data);
    }

    search = (name: string) => {
        return instance.get<T>(`${this.endpoint}/${name}`)
            .then(response => response.data);
    }
}

export default APIClient;