import { SimpleGrid } from "@chakra-ui/react";
import usePokemons from "../../hooks/usePokemons"
import PokemonCard from "./PokemonCard";

const PokemonsContainer = () => {
    const { data: pokemons, isLoading, error } = usePokemons();

    if (isLoading) return <p>Loading...</p>

    if (error) return <p>{error.message}</p>

    return (
        <SimpleGrid gap={4} columns={[2, 4]}>
            {pokemons?.map(result => <PokemonCard result={result} />)}
        </SimpleGrid>
    )
}

export default PokemonsContainer