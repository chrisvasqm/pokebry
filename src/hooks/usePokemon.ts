import { useQuery } from "@tanstack/react-query";
import Pokemon from "../models/Pokemon";
import APIClient from "../services/apiClient";

const client = new APIClient<Pokemon>('/api/pokemon');

const usePokemon = (url: string) => useQuery<Pokemon, Error>({
    queryKey: ['pokemon', url],
    queryFn: () => client.find(url),
})

export default usePokemon;