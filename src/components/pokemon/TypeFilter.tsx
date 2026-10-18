import { Box, Button, HStack, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import typeColors from "../../colors/typeColors";
import { capitalizeName } from "../../common";
import useTypeFilter from "../../hooks/useTypeFilter";
import { useTypeMatchCount } from "../../hooks/useTypePokemons";
import { POKEMON_TYPES, PokemonType } from "../../models/PokemonType";

/** Matches for the whole selection, shown on every selected chip so two chips never disagree with the list. */
const TypeCount = ({ type, selected }: { type: PokemonType, selected: PokemonType[] }) => {
    const count = useTypeMatchCount(selected);
    if (count === undefined) return null;
    return <Box as='span' fontWeight={'normal'} opacity={0.8} data-testid={`type-chip-count-${type}`}>{count}</Box>
}

/** Row of type chips below the navbar. Selected chips fill with their type color and show how many Pokemon match. */
const TypeFilter = () => {
    const { selected, toggle, clear } = useTypeFilter();
    const idleBorder = useColorModeValue('gray.200', 'whiteAlpha.300');
    const selectedText = 'gray.800';
    const railRef = useRef<HTMLDivElement>(null);
    const selectedKey = selected.join(',');

    // Keep the chips that are on (e.g. from a shared URL) inside the visible part of the scrolling rail.
    useEffect(() => {
        const chips = railRef.current?.querySelectorAll<HTMLElement>('[aria-pressed="true"]') ?? [];
        chips.forEach(chip => chip.scrollIntoView({ inline: 'nearest', block: 'nearest' }));
    }, [selectedKey]);

    return (
        <HStack id='type-filter' data-testid='type-filter' spacing={2} paddingY={2} borderTopWidth={1} borderColor={idleBorder}>
            <HStack
                ref={railRef}
                role='group'
                aria-label='Filter by type'
                spacing={2}
                flex={1}
                minWidth={0}
                overflowX={'auto'}
                sx={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
                {POKEMON_TYPES.map(type => {
                    const isSelected = selected.includes(type);
                    const color = typeColors[type];
                    return (
                        <Button
                            key={type}
                            id={`type-chip-${type}`}
                            data-testid={`type-chip-${type}`}
                            aria-pressed={isSelected}
                            onClick={() => toggle(type)}
                            size={'sm'}
                            flexShrink={0}
                            borderRadius={'full'}
                            borderWidth={1}
                            borderColor={isSelected ? color : idleBorder}
                            backgroundColor={isSelected ? color : 'transparent'}
                            color={isSelected ? selectedText : undefined}
                            _hover={{ backgroundColor: isSelected ? color : undefined, filter: 'brightness(0.96)' }}
                            leftIcon={
                                <Box
                                    boxSize={'10px'}
                                    borderRadius={'full'}
                                    backgroundColor={color}
                                    boxShadow={isSelected ? '0 0 0 2px rgba(255,255,255,0.7)' : undefined} />
                            }>
                            <HStack spacing={1}>
                                <span>{capitalizeName(type)}</span>
                                {isSelected && <TypeCount type={type} selected={selected} />}
                            </HStack>
                        </Button>
                    )
                })}
            </HStack>
            {selected.length > 0 &&
                <Button
                    id='type-filter-clear'
                    data-testid='type-filter-clear'
                    onClick={clear}
                    size={'sm'}
                    variant={'link'}
                    flexShrink={0}>
                    Clear
                </Button>}
        </HStack>
    )
}

export default TypeFilter;
