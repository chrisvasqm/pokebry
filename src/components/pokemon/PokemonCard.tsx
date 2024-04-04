import { Card, VStack, Image, Text } from "@chakra-ui/react"
import PokemonResult from "../../models/PokemonResult"
import usePokemonByUrl from "../../hooks/usePokemonByUrl"
import typeColors from "../../colors/typeColors"
import { Link } from "react-router-dom"

interface Props {
  result: PokemonResult
}

const PokemonCard = ({ result }: Props) => {
  const { data: pokemon, isLoading, error } = usePokemonByUrl(result.url);

  if (isLoading) return <p>Loading...</p>

  if (error) return <p>{error.message}</p>

  const name = `${pokemon?.name.charAt(0).toUpperCase()}${pokemon?.name.slice(1)}`

  const primaryType = pokemon?.types[0].type.name;
  const typeColor = typeColors[primaryType || '']

  return (
    <Link to={`/pokemons/${pokemon?.id}`}>
      <Card
        padding={2}
        boxShadow={'lg'}
        borderRadius={'xl'}
        backgroundColor={typeColor}>
        <VStack>
          <Image src={pokemon?.sprites.other["official-artwork"].front_default} />
          <Text fontWeight={'semibold'}>{name}</Text>
        </VStack>
      </Card>
    </Link>
  )
}

export default PokemonCard