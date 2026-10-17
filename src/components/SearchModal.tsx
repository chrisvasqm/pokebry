import { SearchIcon } from "@chakra-ui/icons";
import {
    Avatar, Box, HStack, Input, InputGroup, InputLeftElement, Kbd, List, ListItem,
    Modal, ModalBody, ModalContent, ModalOverlay, Spinner, Text
} from "@chakra-ui/react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeName } from "../common";
import useDebounce from "../hooks/useDebounce";
import usePokemonSearch from "../hooks/usePokemonSearch";

export const SEARCH_DEBOUNCE_MS = 500;

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: Props) => {
    const [term, setTerm] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const debouncedTerm = useDebounce(term, SEARCH_DEBOUNCE_MS);
    const { data, isFetching, error } = usePokemonSearch(debouncedTerm);
    const isWaiting = term.trim().length > 0 && (term !== debouncedTerm || isFetching);
    // Never show or act on results that belong to a previous term.
    const results = isWaiting ? [] : data ?? [];
    const activeResult = results[activeIndex];

    useEffect(() => {
        if (isOpen) {
            setTerm('');
            setActiveIndex(0);
        }
    }, [isOpen]);

    useEffect(() => setActiveIndex(0), [debouncedTerm]);

    const select = (id: number) => {
        navigate(`/pokemons/${id}`);
        onClose();
    }

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActiveIndex(index => Math.max(0, Math.min(index + 1, results.length - 1)));
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveIndex(index => Math.max(index - 1, 0));
        } else if (event.key === 'Enter' && activeResult) {
            select(activeResult.id);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={inputRef} size={'lg'}>
            <ModalOverlay />
            <ModalContent id='search-modal' marginTop={'10vh'}>
                <ModalBody padding={2}>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            {isWaiting ? <Spinner size='sm' /> : <SearchIcon />}
                        </InputLeftElement>
                        <Input
                            id='search-input'
                            ref={inputRef}
                            variant='filled'
                            placeholder='Search Pokemon by name'
                            role='combobox'
                            aria-expanded={results.length > 0}
                            aria-controls='search-results'
                            aria-activedescendant={activeResult ? `search-result-${activeResult.name}` : undefined}
                            aria-autocomplete='list'
                            value={term}
                            onChange={event => setTerm(event.target.value)}
                            onKeyDown={onKeyDown}
                        />
                    </InputGroup>

                    {error && <Text id='search-error' padding={3} color='red.400'>{error.message}</Text>}

                    {!error && debouncedTerm.trim() && !isWaiting && results.length === 0 &&
                        <Text id='search-empty' padding={3}>No Pokemon found.</Text>}

                    {results.length > 0 &&
                        <List id='search-results' role='listbox' marginTop={2}>
                            {results.map((result, index) =>
                                <ListItem
                                    key={result.id}
                                    id={`search-result-${result.name}`}
                                    role='option'
                                    aria-selected={index === activeIndex}
                                    cursor='pointer'
                                    borderRadius='md'
                                    padding={2}
                                    background={index === activeIndex ? 'blackAlpha.200' : undefined}
                                    _dark={{ background: index === activeIndex ? 'whiteAlpha.200' : undefined }}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onClick={() => select(result.id)}>
                                    <HStack>
                                        <Avatar size='sm' name={result.name} src={result.sprite} background='transparent' />
                                        <Text fontWeight='semibold'>{capitalizeName(result.name)}</Text>
                                        <Text color='gray.500'>#{result.id}</Text>
                                    </HStack>
                                </ListItem>
                            )}
                        </List>}

                    <Box paddingX={2} paddingTop={2} fontSize='xs' color='gray.500'>
                        <Kbd>↑</Kbd> <Kbd>↓</Kbd> to navigate, <Kbd>Enter</Kbd> to open, <Kbd>Esc</Kbd> to close
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default SearchModal;
