import { useQuery } from "@tanstack/react-query";
import Pokemon from "../models/Pokemon";
import APIClient from "../services/apiClient";
import ms from "ms";

const client = new APIClient<Pokemon>('/pokemon');

const usePokemon = (id: number) => useQuery<Pokemon, Error>({
    queryKey: ['pokemon', id],
    queryFn: () => client.get(id),
    staleTime: ms('24h')
})

export default usePokemon;