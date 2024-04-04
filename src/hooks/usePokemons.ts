import { useQuery } from "@tanstack/react-query";
import client from "../services/pokemonService";

const usePokemons = () => useQuery({
    queryKey: ['pokemons'],
    queryFn: client.getAll
})

export default usePokemons