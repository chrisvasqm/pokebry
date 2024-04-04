import { Card, Center, Image, Text, VStack } from "@chakra-ui/react";
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import usePokemon from "../../hooks/usePokemon";
import useTitleStore from "../../store/useTitleStore";
import PokemonTabs from "./PokemonTabs";
import PokemonTypeBadge from "./PokemonTypeBadge";

const PokemonDetail = () => {
  const { id } = useParams();
  const { data: pokemon, isLoading, error } = usePokemon(parseInt(id!));
  const setTitle = useTitleStore(state => state.setTitle);

  useEffect(() => {
    setTitle(pokemon?.name || '');
  }, [pokemon?.name, setTitle])

  if (isLoading) return <Text>Loading...</Text>

  if (error) return <Text>{error.message}</Text>

  return (
    <Card>
      <Center>
        <VStack>
          <Image
            src={pokemon?.sprites.other["official-artwork"].front_default}
            boxSize={'250px'}
          />
          <PokemonTypeBadge pokemon={pokemon!} />
        </VStack>
      </Center>
      <PokemonTabs pokemon={pokemon!} />
    </Card>
  )
}

export default PokemonDetail