import { Button, Center, SimpleGrid, Spinner } from "@chakra-ui/react";
import React from "react";
import usePokemons from "../../hooks/usePokemons";
import PokemonCard from "./PokemonCard";

const PokemonsContainer = () => {
    const { data, isLoading, error, isFetchingNextPage, fetchNextPage } = usePokemons({ limit: 52 });

    if (isLoading) return <Center height={'100vh'}><Spinner /></Center>

    if (error) return <p>{error.message}</p>

    return (
        <>
            <SimpleGrid gap={3} columns={[2, 3, 4, 5, 6]}>
                {data?.pages.map((page, index) =>
                    <React.Fragment key={index}>
                        {page.map(result => <PokemonCard key={result.name} result={result} />)}
                    </React.Fragment>
                )}
            </SimpleGrid>
            <Center marginY={2}>
                <Button
                    colorScheme="blue"
                    isLoading={isLoading || isFetchingNextPage}
                    onClick={() => fetchNextPage()}>
                    Load More
                </Button>
            </Center>
        </>
    )
}

export default PokemonsContainer