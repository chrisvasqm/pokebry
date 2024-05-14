import { Card, Image, Skeleton, Spinner, Text, VStack } from "@chakra-ui/react"
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
      whileHover={{ scale: 1.03 }}
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
            alignItems={'center'}
            justifyContent={'center'}
            minWidth='40px'
            minHeight='180px'>
              
            {isLoading && <Spinner boxSize={'40px'} />}

            {!isLoading &&
              <VStack height={'100%'} align={'center'} justify={'center'}>
                
                <Image
                  id='card-image'
                  boxSize={'130px'}
                  objectFit={'contain'}
                  src={pokemon?.sprites.other["official-artwork"].front_default || "/src/assets/pokeball.png"} />
                
                <Text
                  id='card-name'
                  fontWeight={'semibold'}>
                  {capitalizeName(pokemon?.name || '')}
                </Text>

              </VStack>}
          </Card>
        </Skeleton>
      </Link>
    </motion.div >
  )
}

export default PokemonCard