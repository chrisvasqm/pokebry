import { Center, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { capitalizeName } from "../../common";
import usePokemons from "../../hooks/usePokemons";
import useTypeFilter from "../../hooks/useTypeFilter";
import PokemonCard from "./PokemonCard";

/** The narrowest grid shows 2 columns; boosting more would compete with the largest image on phones. */
const PRIORITY_CARDS = 2;

const PokemonsContainer = () => {
    const { selected } = useTypeFilter();
    const {
        data,
        error,
        isPending,
        isPlaceholderData,
        fetchNextPage,
        hasNextPage
    } = usePokemons({ limit: 52, types: selected });

    if (error) return <p>{error.message}</p>

    const fetchedPokemonsCount = data?.pages.reduce((total, page) => total + page.length, 0) || 0;
    const summary = selected.length === 0 ? 'All Pokemon' : `${selected.map(capitalizeName).join(' and ')} Pokemon`;
    const emptyMessage = selected.length > 1
        ? 'No Pokemon has both of these types. Remove one to see results.'
        : 'No Pokemon found. Clear the filter to see results.';

    return (
        <>
        <Text id='list-summary' data-testid='list-summary' fontSize={'sm'} color={'text.muted'} marginBottom={2} marginX={1}>{summary}</Text>
        {!isPending && !isPlaceholderData && fetchedPokemonsCount === 0 &&
            <Text id='list-empty' data-testid='list-empty' textAlign={'center'} paddingY={12}>{emptyMessage}</Text>}
        <InfiniteScroll
            // Remount per filter: the component only resets its "next page requested" latch when dataLength changes.
            key={selected.join(',')}
            dataLength={fetchedPokemonsCount}
            // Placeholder pages belong to the previous filter; never page them into a query that has not loaded yet.
            hasMore={hasNextPage && !isPlaceholderData}
            next={fetchNextPage}
            loader={<Center marginY={4}><Spinner /></Center>}>
            <SimpleGrid
                id='list-grid'
                data-testid='list-grid'
                padding={1}
                gap={3}
                columns={[2, 3, 4, 5, 6]}
                // Previous results stay as a placeholder while a new filter loads; dim them so the change is visible.
                opacity={isPlaceholderData ? 0.4 : 1}
                transition={'opacity 150ms'}
                aria-busy={isPlaceholderData}>
                {data?.pages.map((page, pageIndex) =>
                    <React.Fragment key={pageIndex}>
                        {page.map((result, index) => <PokemonCard key={result.name} result={result} isPriority={pageIndex === 0 && index < PRIORITY_CARDS} />)}
                    </React.Fragment>
                )}
            </SimpleGrid>
        </InfiniteScroll>
        </>
    )
}

export default PokemonsContainer