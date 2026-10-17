import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import PokemonSearchResult from "../models/PokemonSearchResult";
import GraphQLClient from "../services/graphqlClient";

const client = new GraphQLClient();

const SEARCH_QUERY = `
    query SearchPokemon($pattern: String!, $limit: Int!) {
        pokemon(where: { name: { _ilike: $pattern } }, order_by: { id: asc }, limit: $limit) {
            id
            name
            pokemonsprites { sprites }
        }
    }
`;

interface SearchData {
    pokemon: {
        id: number;
        name: string;
        pokemonsprites: { sprites: { front_default?: string | null } }[];
    }[];
}

const escapeLike = (term: string) => term.replace(/[\\%_]/g, match => `\\${match}`);

const normalize = (term: string) => term.trim().toLowerCase();

const usePokemonSearch = (term: string, limit = 10) => {
    const normalized = normalize(term);

    return useQuery<PokemonSearchResult[], Error>({
        queryKey: ['pokemon-search', normalized, limit],
        queryFn: () => client
            .query<SearchData>(SEARCH_QUERY, { pattern: `%${escapeLike(normalized)}%`, limit })
            .then(data => data.pokemon.map(pokemon => ({
                id: pokemon.id,
                name: pokemon.name,
                sprite: pokemon.pokemonsprites[0]?.sprites.front_default ?? undefined
            }))),
        enabled: normalized.length > 0,
        staleTime: ms('24h')
    });
}

export default usePokemonSearch;
