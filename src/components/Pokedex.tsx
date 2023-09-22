import { useEffect, useState } from 'react';
import { VStack, useToast } from '@chakra-ui/react';
import TopBar from './TopBar';
import Screen from './Screen';
import BottomBar from './BottomBar';
import Pokemon from '../models/Pokemon';
import PokemonsService from '../services/pokemons';
const service = new PokemonsService();

function PokeDex() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemonId, setPokemonId] = useState(1);
  const toast = useToast();

  useEffect(() => {
    service
      .find(pokemonId)
      .then(response => setPokemon(response.data))
      .catch(error => {
        console.log(`Error fetching Pokemon details: ${error}`);
        toast({
          description: error.response.data,
          status: 'error',
          duration: 3000,
          isClosable: true
        });
      });
  }, [pokemonId, toast]);

  function handleNext() {
    if (pokemonId >= 1017) return;

    setPokemonId(pokemonId + 1);
  }

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
      <Screen pokemon={pokemon} />
      <BottomBar onNext={handleNext} />
    </VStack>
  );
}

export default PokeDex;
