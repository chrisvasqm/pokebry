import { Card, Center, Image, Spinner, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { capitalizeName, getPrimaryColorByType } from "../../common"
import usePokemonByUrl from "../../hooks/usePokemonByUrl"
import PokemonResult from "../../models/PokemonResult"

interface Props {
  result: PokemonResult
}

const PokemonCard = ({ result }: Props) => {
  const { data: pokemon, isLoading, error } = usePokemonByUrl(result.url);

  if (isLoading) return <Center><Spinner /></Center>

  if (error) return <p>{error.message}</p>

  const typeColor = getPrimaryColorByType(pokemon!)

  return (
    <Link to={`/pokemons/${pokemon?.id}`}>
      <Card
        padding={2}
        boxShadow={'lg'}
        borderRadius={'xl'}
        backgroundColor={typeColor}>
        <VStack>
          <Image src={pokemon?.sprites.other["official-artwork"].front_default || "/src/assets/pokeball.png"} />
          <Text fontWeight={'semibold'}>{capitalizeName(pokemon?.name || '')}</Text>
        </VStack>
      </Card>
    </Link>
  )
}

export default PokemonCard