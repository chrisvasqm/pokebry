import { queryOptions, useQuery } from "@tanstack/react-query";
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
    queryFn: () => client.find(`/type/${type}`)
        .then(data => data.pokemon
            .map(entry => entry.pokemon)
            .sort((a, b) => (getIdFromUrl(a.url) ?? 0) - (getIdFromUrl(b.url) ?? 0))),
    staleTime: ms('24h')
});

export const useTypePokemonCount = (type: PokemonType) =>
    useQuery({ ...typePokemonsQuery(type), select: results => results.length });
