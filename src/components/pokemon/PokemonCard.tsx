import { Card, Image, Skeleton, Text, VStack } from "@chakra-ui/react"
import { motion } from 'framer-motion'
import { Link } from "react-router-dom"
import { capitalizeName, getPrimaryColorByType } from "../../common"
import usePokemonByUrl from "../../hooks/usePokemonByUrl"
import PokemonResult from "../../models/PokemonResult"

interface Props {
  result: PokemonResult
}

const PokemonCard = ({ result }: Props) => {
  const { data: pokemon, isLoading, error } = usePokemonByUrl(result.url);

  if (error) return <p>{error.message}</p>

  const typeColor = getPrimaryColorByType(pokemon!)

  return (
    <motion.div
      id={`card-container-${pokemon?.name}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/pokemons/${pokemon?.id}`}>
        <Skeleton isLoaded={!isLoading} borderRadius={'xl'}>
          <Card
            padding={2}
            boxShadow={'lg'}
            borderRadius={'xl'}
            backgroundColor={typeColor}
            minWidth='40px'
            minHeight='180px'>
            <VStack>
              <Image id='card-image' src={pokemon?.sprites.other["official-artwork"].front_default || "/src/assets/pokeball.png"} />
              <Text id='card-name' fontWeight={'semibold'}>{capitalizeName(pokemon?.name || '')}</Text>
            </VStack>
          </Card>
        </Skeleton>
      </Link>
    </motion.div>
  )
}

export default PokemonCard