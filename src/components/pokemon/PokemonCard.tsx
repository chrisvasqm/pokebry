import { Card, Image, Skeleton, Spinner, Text, VStack } from "@chakra-ui/react"
import { motion } from 'framer-motion'
import { Link } from "react-router-dom"
import { capitalizeName, getIdFromUrl, getPrimaryColorByType } from "../../common"
import usePokemonByUrl from "../../hooks/usePokemonByUrl"
import PokemonResult from "../../models/PokemonResult"
import { fadeUp, fadeUpTransition } from "../motion/fadeUp"

interface Props {
  result: PokemonResult
}

const PokemonCard = ({ result }: Props) => {
  const { data: pokemon, isLoading, error } = usePokemonByUrl(result.url);

  if (error) return <p>{error.message}</p>

  const typeColor = getPrimaryColorByType(pokemon!)
  const id = getIdFromUrl(result.url) ?? pokemon?.id

  return (
    <motion.div
      id={`card-container-${result.name}`}
      data-testid={`card-${result.name}`}
      variants={fadeUp}
      // Only fade in while the card is actually loading; cached cards (e.g. after Back) render in place.
      initial={isLoading ? 'hidden' : false}
      animate='shown'
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      transition={{ ...fadeUpTransition, scale: { duration: 0.1 } }}
    >
      <Link to={`/pokemons/${id}`}>
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
                  boxSize={'96px'}
                  objectFit={'contain'}
                  src={pokemon?.sprites.front_default || "/pokeball.png"} />

                <Text
                  id='card-name'
                  data-testid='card-name'
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