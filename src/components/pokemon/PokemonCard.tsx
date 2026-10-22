import { Card, Image, Text, VStack } from "@chakra-ui/react"
import { motion } from 'framer-motion'
import { Link, useLocation } from "react-router-dom"
import { FALLBACK_IMAGE, capitalizeName, getIdFromUrl, getPrimaryColorByType, getSpriteUrl, replaceWithFallback } from "../../common"
import usePokemonByUrl from "../../hooks/usePokemonByUrl"
import PokemonResult from "../../models/PokemonResult"
import { fadeUp, fadeUpTransition } from "../motion/fadeUp"

interface Props {
  result: PokemonResult
  /** Cards in the first visible row: load their sprites first, since one is the page's largest paint. */
  isPriority?: boolean
  /** Cards that can be in the first row: load eagerly. */
  isFirstRow?: boolean
}

const PokemonCard = ({ result, isPriority = false, isFirstRow = false }: Props) => {
  const { data: pokemon, isLoading, error } = usePokemonByUrl(result.url);
  const location = useLocation();

  if (error) return <p>{error.message}</p>

  const typeColor = getPrimaryColorByType(pokemon!)
  const id = getIdFromUrl(result.url) ?? pokemon?.id
  // Name and sprite come from the list result, so the card shows them at once; only the type color waits for the data.
  const sprite = id ? getSpriteUrl(id) : pokemon?.sprites.front_default

  return (
    <motion.div
      id={`card-container-${result.name}`}
      data-testid={`card-${result.name}`}
      variants={fadeUp}
      // Only fade in while the card is actually loading; cached cards (e.g. after Back) render in place.
      // First-row cards never fade: one of their sprites is the page's largest paint.
      initial={isLoading && !isFirstRow ? 'hidden' : false}
      animate='shown'
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      transition={{ ...fadeUpTransition, scale: { duration: 0.1 } }}
    >
      {/* The detail page's Back link returns to this list with the same filter. */}
      {/* Named from the list result so the link has a name while the card is still loading. */}
      <Link to={`/pokemons/${id}`} state={{ search: location.search }} aria-label={capitalizeName(result.name)}>
        <Card
          padding={2}
          boxShadow={'lg'}
          borderRadius={'xl'}
          backgroundColor={typeColor}
          color={typeColor ? 'type.fg' : undefined}
          transition={'background-color 200ms'}
          alignItems={'center'}
          justifyContent={'center'}
          minWidth='40px'
          minHeight='180px'>
          <VStack height={'100%'} align={'center'} justify={'center'}>
            <Image
              // The name below already labels the link.
              alt=''
              data-testid={`card-image-${result.name}`}
              loading={isFirstRow ? 'eager' : 'lazy'}
              // React 18 does not know the camelCase fetchPriority prop; the lowercase attribute passes through.
              {...(isPriority ? { fetchpriority: 'high' } : {})}
              boxSize={'96px'}
              objectFit={'contain'}
              src={sprite || FALLBACK_IMAGE}
              // Chakra ignores fallbackSrc when `loading` is set, so swap to the fallback on error instead.
              onError={replaceWithFallback} />

            <Text
              data-testid='card-name'
              fontWeight={'semibold'}>
              {capitalizeName(result.name)}
            </Text>
          </VStack>
        </Card>
      </Link>
    </motion.div >
  )
}

export default PokemonCard