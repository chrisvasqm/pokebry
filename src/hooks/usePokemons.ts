import { QueryClient, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import PokemonResult from "../models/PokemonResult";
import { PokemonType } from "../models/PokemonType";
import APIClient from "../services/apiClient";
import { intersectTypeLists, typePokemonsQuery } from "./useTypePokemons";

const client = new APIClient<PokemonResult>('/pokemon')

interface PokemonsQuery {
    limit: number
    /** Pokemon must have every listed type. Empty lists every Pokemon. */
    types: PokemonType[]
}

/** PokeAPI has no multi-type endpoint, so each type list is fetched (and cached) whole and intersected client-side. */
const fetchByTypes = async (queryClient: QueryClient, query: PokemonsQuery, offset: number) => {
    const lists = await Promise.all(query.types.map(type => queryClient.fetchQuery(typePokemonsQuery(type))));
    return intersectTypeLists(lists).slice(offset, offset + query.limit);
}

const usePokemons = (query: PokemonsQuery) => {
    const queryClient = useQueryClient();
    // Same filter, same cache entry whatever order the types were picked in.
    const types = [...query.types].sort();

    return useInfiniteQuery<PokemonResult[], Error>({
        queryKey: ['pokemons', { limit: query.limit, types }],
        queryFn: ({ pageParam }) => {
            const offset = (pageParam as number - 1) * query.limit;
            if (types.length > 0) return fetchByTypes(queryClient, { ...query, types }, offset);
            return client.getAll({ params: { limit: query.limit, offset } });
        },
        placeholderData: previousData => previousData,
        staleTime: ms('24h'),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length < query.limit ? undefined : allPages.length + 1;
        }
    })
}

export default usePokemons
