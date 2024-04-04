import { useQuery } from "@tanstack/react-query";
import Pokemon from "../models/Pokemon";
import APIClient from "../services/apiClient";

const client = new APIClient<Pokemon>('/pokemon');

const usePokemon = (id: number) => useQuery<Pokemon, Error>({
    queryKey: ['pokemon', id],
    queryFn: () => client.get(id),
})

export default usePokemon;