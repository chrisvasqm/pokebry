import { useQuery } from "@tanstack/react-query";
import service from '../services/pokemonService';
import Pokemon from "../models/Pokemon";

const usePokemon = (id: number) => {
    return useQuery<Pokemon, Error>({
        queryKey: ['pokemon', id],
        queryFn: () => service.find(id),
        placeholderData: prev => prev
    })
}

export default usePokemon;