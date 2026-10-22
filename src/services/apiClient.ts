import ky, { SearchParamsOption } from "ky";

const instance = ky.create({
    baseUrl: 'https://pokeapi.co/api/v2/',
    // TanStack Query already retries failed queries; retrying here too would multiply the attempts.
    retry: 0
});

interface FetchResponse<T> {
    results: T[]
}

class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        // Relative to baseUrl: a leading slash would resolve against the origin and drop /api/v2.
        this.endpoint = endpoint.replace(/^\//, '');
    }

    getAll = (searchParams?: SearchParamsOption) =>
        instance.get(this.endpoint, { searchParams }).json<FetchResponse<T>>()
            .then(response => response.results);

    find = (url: string) =>
        instance.get(url).json<T>();

    get = (idOrName: number | string) =>
        instance.get(`${this.endpoint}/${idOrName}`).json<T>();

}

export default APIClient;
