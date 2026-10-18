import { Center, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { capitalizeName } from "../../common";
import usePokemons from "../../hooks/usePokemons";
import useTypeFilter from "../../hooks/useTypeFilter";
import PokemonCard from "./PokemonCard";

const PokemonsContainer = () => {
    const { selected } = useTypeFilter();
    const {
        data,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage
    } = usePokemons({ limit: 52, types: selected });

    if (error) return <p>{error.message}</p>

    const fetchedPokemonsCount = data?.pages.reduce((total, page) => total + page.length, 0) || 0;
    const summary = selected.length === 0 ? 'All Pokemon' : `${selected.map(capitalizeName).join(' and ')} Pokemon`;

    return (
        <>
        <Text id='list-summary' data-testid='list-summary' fontSize={'sm'} color={'gray.500'} marginBottom={2} marginX={1}>{summary}</Text>
        {!isLoading && fetchedPokemonsCount === 0 &&
            <Text id='list-empty' data-testid='list-empty' textAlign={'center'} paddingY={12}>
                No Pokemon has both of these types. Remove one to see results.
            </Text>}
        <InfiniteScroll
            dataLength={fetchedPokemonsCount}
            hasMore={hasNextPage}
            next={fetchNextPage}
            loader={<Center marginY={4}><Spinner /></Center>}>
            <SimpleGrid id='list-grid' data-testid='list-grid' padding={1} gap={3} columns={[2, 3, 4, 5, 6]}>
                {data?.pages.map((page, index) =>
                    <React.Fragment key={index}>
                        {page.map(result => <PokemonCard key={result.name} result={result} />)}
                    </React.Fragment>
                )}
            </SimpleGrid>
        </InfiniteScroll>
        </>
    )
}

export default PokemonsContainer