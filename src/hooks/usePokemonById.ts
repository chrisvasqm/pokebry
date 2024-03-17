import { useQuery } from "@tanstack/react-query";
import service from '../services/pokemonService';

const usePokemonById = (id: number) => {
    return useQuery({
        queryKey: ['pokemon', id],
        queryFn: () => service.find(id),
        placeholderData: prev => prev
    })
}

export default usePokemonById;