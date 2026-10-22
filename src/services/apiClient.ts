import { SearchParamsOption } from "ky";
import http from "./http";

// baseUrl, not prefix: `find` gets absolute URLs, which prefix would prepend to.
const instance = http.extend({ baseUrl: 'https://pokeapi.co/api/v2/' });

interface FetchResponse<T> {
    results: T[]
}

class APIClient<T> {
    endpoint: string;

    /** Relative to the base URL, without a leading slash (e.g. 'pokemon'): '/pokemon' would drop /api/v2. */
    constructor(endpoint: string) {
        this.endpoint = endpoint;
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
