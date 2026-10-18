import { queryOptions, useQueries } from "@tanstack/react-query";
import ms from "ms";
import { getIdFromUrl } from "../common";
import PokemonResult from "../models/PokemonResult";
import { PokemonType } from "../models/PokemonType";
import APIClient from "../services/apiClient";

interface TypeResponse {
    pokemon: { pokemon: PokemonResult }[]
}

const client = new APIClient<TypeResponse>('/type');

/** Every Pokemon of one type, ordered by id. Shared by the list query and the chip counts. */
export const typePokemonsQuery = (type: PokemonType) => queryOptions<PokemonResult[], Error>({
    queryKey: ['type-pokemons', type],
    queryFn: () => client.get(type)
        .then(data => data.pokemon
            .map(entry => entry.pokemon)
            .sort((a, b) => (getIdFromUrl(a.url) ?? 0) - (getIdFromUrl(b.url) ?? 0))),
    // `queryClient.fetchQuery` defaults to no retries; match `useQuery` so both list paths survive a blip.
    retry: 3,
    staleTime: ms('24h')
});

/** Pokemon that have every one of the given types, in id order of the first list. */
export const intersectTypeLists = (lists: PokemonResult[][]) => {
    const [first, ...rest] = lists;
    if (!first) return [];
    const nameSets = rest.map(list => new Set(list.map(result => result.name)));
    return first.filter(result => nameSets.every(names => names.has(result.name)));
}

/** How many Pokemon match the whole selection; undefined until every type list has loaded. */
export const useTypeMatchCount = (types: PokemonType[]) => useQueries({
    queries: types.map(typePokemonsQuery),
    combine: results => results.every(result => result.data)
        ? intersectTypeLists(results.map(result => result.data!)).length
        : undefined
});
