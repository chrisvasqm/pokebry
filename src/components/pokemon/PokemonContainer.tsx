import { Button, Center, SimpleGrid, Spinner } from "@chakra-ui/react";
import usePokemons from "../../hooks/usePokemons";
import PokemonCard from "./PokemonCard";
import { useState } from "react";

const PokemonsContainer = () => {
    const [limit, setLimit] = useState(20);
    const { data: pokemons, isLoading, error } = usePokemons({ limit });

    if (isLoading) return <Center height={'100vh'}><Spinner /></Center>

    if (error) return <p>{error.message}</p>

    return (
        <>
            <SimpleGrid gap={3} columns={[2, 3, 4]}>
                {pokemons?.map(result => <PokemonCard key={result.name} result={result} />)}
            </SimpleGrid>
            <Center marginY={2}>
                <Button
                    colorScheme="blue"
                    isLoading={isLoading}
                    onClick={() => setLimit(limit + 16)}>
                    Load More
                </Button>
            </Center>
        </>
    )
}

export default PokemonsContainer