import { VStack } from '@chakra-ui/react';
import TopBar from './TopBar';
import Screen from './Screen';
import BottomBar from './BottomBar';
import { useEffect, useState } from 'react';
import Pokemon from '../models/Pokemon';
import PokemonsService from '../services/pokemons';
const service = new PokemonsService();

function PokeDex() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    service
      .find(1)
      .then(response => setPokemon(response.data))
      .catch(error => console.log(`Error fetching Pokemon details: ${error}`));
  }, []);

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
      backgroundColor={'#F00222'}
      boxShadow='10px 10px 10px rgba(0, 0, 0, 0.4)'
    >
      <TopBar />
      <Screen pokemon={pokemon} />
      <BottomBar />
    </VStack>
  );
}

export default PokeDex;
