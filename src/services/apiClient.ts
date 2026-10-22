import { SearchParamsOption } from "ky";
import http from "./http";

// baseUrl, not prefix: `find` gets absolute URLs, which prefix would prepend to.
const instance = http.extend({ baseUrl: 'https://pokeapi.co/api/v2/' });

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
