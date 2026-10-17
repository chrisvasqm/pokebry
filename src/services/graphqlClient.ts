import axios from "axios";

const instance = axios.create({
    baseURL: 'https://graphql.pokeapi.co/v1beta2',
    headers: { 'Content-Type': 'application/json' }
});

interface GraphQLResponse<T> {
    data?: T;
    errors?: { message: string }[];
}

class GraphQLClient {
    query = <T, V extends object = object>(query: string, variables?: V) =>
        instance.post<GraphQLResponse<T>>('', { query, variables })
            .then(response => {
                const { data, errors } = response.data;
                if (errors?.length) throw new Error(errors.map(error => error.message).join('; '));
                if (!data) throw new Error('Empty GraphQL response');
                return data;
            });
}

export default GraphQLClient;
