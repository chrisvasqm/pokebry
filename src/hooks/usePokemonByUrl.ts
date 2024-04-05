import { useQuery } from "@tanstack/react-query";
import Pokemon from "../models/Pokemon";
import APIClient from "../services/apiClient";
import ms from "ms";

const client = new APIClient<Pokemon>('/api/pokemon');

const usePokemonByUrl = (url: string) => useQuery<Pokemon, Error>({
    queryKey: ['pokemonUrl', url],
    queryFn: () => client.find(url),
    staleTime: ms('24h')
})

export default usePokemonByUrl;