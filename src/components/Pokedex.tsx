import { VStack, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import usePokemon from '../hooks/usePokemon';
import BottomBar from './BottomBar';
import Screen from './Screen';
import TopBar from './TopBar';

function PokeDex() {
  const [pokemonId, setPokemonId] = useState<number | string>(1);
  const [query, setQuery] = useState('');
  const { data: pokemon, isLoading, error } = usePokemon(pokemonId);
  const toast = useToast();

  function handleNext() {
    if (typeof pokemonId === 'number' && pokemonId <= 1017)
      setPokemonId(pokemonId + 1);
  }

  function handlePrevious() {
    if (typeof pokemonId === 'number' && pokemonId > 1)
      setPokemonId(pokemonId - 1);
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    if (query == '') return;

    if (query == pokemon?.name) return;

    setPokemonId(query.toLowerCase());
    setQuery('');
  }

  if (error) toast({
    isClosable: true,
    description: error.message,
    duration: 3000,
    status: 'error'
  });

  return (
    <VStack
      align={'left'}
      width={'100%'}
      borderTopLeftRadius={15}
      borderTopRightRadius={0}
      borderBottomLeftRadius={15}
      borderBottomRightRadius={0}
      placeContent={'start'}
      padding={6}
      backgroundColor={'#E80D28'}
      boxShadow='10px 10px 10px rgba(0, 0, 0, 0.4)'
    >
      <TopBar />
      <Screen pokemon={pokemon} isLoaded={!isLoading} />
      <BottomBar
        pokemonId={pokemonId as number}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isLoaded={!isLoading}
        onSearch={e => setQuery(e.target.value)}
        onSubmit={handleSubmit}
      />
    </VStack>
  );
}

export default PokeDex;
