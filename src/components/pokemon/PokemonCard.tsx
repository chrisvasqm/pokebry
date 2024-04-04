import { Card, VStack, Image, Text } from "@chakra-ui/react"
import PokemonResult from "../../models/PokemonResult"
import usePokemon from "../../hooks/usePokemon"

interface Props {
  result: PokemonResult
}

const PokemonCard = ({ result }: Props) => {
  const { data: pokemon, isLoading, error } = usePokemon(result.url);

  if (isLoading) return <p>Loading...</p>

  if (error) return <p>{error.message}</p>

  return (
    <Card padding={2}>
      <VStack>
        <Image src={pokemon?.sprites.front_default} />
        <Text>{pokemon?.name}</Text>
      </VStack>
    </Card>
  )
}

export default PokemonCard