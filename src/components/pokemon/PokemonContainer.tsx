import { Center, SimpleGrid, Spinner } from "@chakra-ui/react";
import usePokemons from "../../hooks/usePokemons"
import PokemonCard from "./PokemonCard";
import useTitleStore from "../../store/useTitleStore";
import { useEffect } from "react";

const PokemonsContainer = () => {
    const setTitle = useTitleStore(state => state.setTitle);

    useEffect(() => {
        setTitle('PokéDex');
    }, [setTitle])

    const { data: pokemons, isLoading, error } = usePokemons();

    if (isLoading) return <Center height={'100vh'}><Spinner /></Center>

    if (error) return <p>{error.message}</p>

    return (
        <SimpleGrid gap={3} columns={[2, 3, 4]}>
            {pokemons?.map(result => <PokemonCard key={result.name} result={result} />)}
        </SimpleGrid>
    )
}

export default PokemonsContainer