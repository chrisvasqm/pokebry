import { useQuery } from "@tanstack/react-query";
import Pokemon from "../models/Pokemon";
import APIClient from "../services/apiClient";

const client = new APIClient<Pokemon>('/api/pokemon');

const usePokemonByUrl = (url: string) => useQuery<Pokemon, Error>({
    queryKey: ['pokemonUrl', url],
    queryFn: () => client.find(url),
})

export default usePokemonByUrl;