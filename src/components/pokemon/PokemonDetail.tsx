import { Card, Center, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import usePokemon from "../../hooks/usePokemon";
import useBackButtonStore from "../../store/useBackButtonStore";
import PokemonTabs from "./PokemonTabs";
import PokemonTypeBadge from "./PokemonTypeBadge";
import { capitalizeName } from "../../common";

const PokemonDetail = () => {
  const { id } = useParams();
  const { data: pokemon, isLoading, error } = usePokemon(parseInt(id!));

  const display = useBackButtonStore(state => state.display);
  display();

  if (isLoading) return <Center height={'100vh'}><Spinner /></Center>

  if (error) return <Text>{error.message}</Text>

  return (
    <Card>
      <Center>
        <VStack>
          <Image
            src={pokemon?.sprites.other["official-artwork"].front_default}
            boxSize={'250px'}
          />
          <Text as={'h2'} fontSize={'xl'} fontWeight={'bold'}>{capitalizeName(pokemon?.name || '')}</Text>
          <PokemonTypeBadge pokemon={pokemon!} />
        </VStack>
      </Center>
      <PokemonTabs pokemon={pokemon!} />
    </Card>
  )
}

export default PokemonDetail