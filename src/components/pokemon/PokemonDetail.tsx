import { Center, Heading, Text, Image, VStack, Card } from "@chakra-ui/react";
import { useParams } from "react-router-dom"
import usePokemon from "../../hooks/usePokemon";
import useTitleStore from "../../store/useTitleStore";
import { useEffect } from 'react';
import { capitalizeName } from "../../common";

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
          <Heading>{capitalizeName(pokemon?.name || '')}</Heading>

          <Image
            src={pokemon?.sprites.other["official-artwork"].front_default}
            boxSize={'250px'}
          />
        </VStack>
      </Center>
    </Card>
  )
}

export default PokemonDetail