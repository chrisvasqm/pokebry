import http from "./http";

const GRAPHQL_URL = 'https://graphql.pokeapi.co/v1beta2';

interface GraphQLResponse<T> {
    data?: T;
    errors?: { message: string }[];
}

class GraphQLClient {
    query = <T, V extends object = object>(query: string, variables?: V) =>
        http.post(GRAPHQL_URL, { json: { query, variables } }).json<GraphQLResponse<T>>()
            .then(({ data, errors }) => {
                if (errors?.length) throw new Error(errors.map(error => error.message).join('; '));
                if (!data) throw new Error('Empty GraphQL response');
                return data;
            });
}

export default GraphQLClient;
