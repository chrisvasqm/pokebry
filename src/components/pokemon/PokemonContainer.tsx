import { Center, SimpleGrid, Spinner } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import usePokemons from "../../hooks/usePokemons";
import PokemonCard from "./PokemonCard";

const PokemonsContainer = () => {
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage
    } = usePokemons({ limit: 52 });

    if (isLoading) return <Center height={'100vh'}><Spinner /></Center>

    if (error) return <p>{error.message}</p>

    const fetchedPokemonsCount = data?.pages.reduce((total, page) => total + page.length, 0) || 0;

    return (
        <InfiniteScroll
            dataLength={fetchedPokemonsCount}
            hasMore={hasNextPage}
            next={fetchNextPage}
            loader={<Spinner />}
        >
            <SimpleGrid gap={3} columns={[2, 3, 4, 5, 6]}>
                {data?.pages.map((page, index) =>
                    <React.Fragment key={index}>
                        {page.map(result => <PokemonCard key={result.name} result={result} />)}
                    </React.Fragment>
                )}
            </SimpleGrid>
        </InfiniteScroll>
    )
}

export default PokemonsContainer