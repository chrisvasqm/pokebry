import { useQuery } from "@tanstack/react-query";
import { isHTTPError } from "ky";
import Pokemon from "../models/Pokemon";
import APIClient from "../services/apiClient";
import ms from "ms";

const client = new APIClient<Pokemon>('pokemon');

const usePokemon = (id: number) => useQuery<Pokemon, Error>({
    queryKey: ['pokemon', id],
    queryFn: () => client.get(id),
    staleTime: ms('24h'),
    // A 404 is permanent: show "does not exist" at once instead of after three retries.
    retry: (failureCount, error) => !(isHTTPError(error) && error.response.status === 404) && failureCount < 3,
    // A non-numeric or non-positive route id (e.g. /pokemons/abc) has nothing to fetch.
    enabled: Number.isInteger(id) && id > 0
})

export default usePokemon;