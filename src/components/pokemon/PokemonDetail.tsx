import { Center, Heading, Text, Image, VStack, Card } from "@chakra-ui/react";
import { useParams } from "react-router-dom"
import usePokemon from "../../hooks/usePokemon";

const PokemonDetail = () => {
  const { id } = useParams();
  const { data: pokemon, isLoading, error } = usePokemon(parseInt(id!));

  if (isLoading) return <Text>Loading...</Text>

  if (error) return <Text>{error.message}</Text>

  return (
    <Card>
      <Center>
        <VStack>
          <Heading>{`${pokemon?.name[0].toUpperCase()}${pokemon?.name.slice(1)}`}</Heading>

          <Image
            src={pokemon?.sprites.front_default}
            boxSize={'250px'}
          />
        </VStack>
      </Center>
    </Card>
  )
}

export default PokemonDetail