import { ArrowBackIcon } from "@chakra-ui/icons";
import { Card, Center, IconButton, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { capitalizeName } from "../../common";
import usePokemon from "../../hooks/usePokemon";
import PokemonTabs from "./PokemonTabs";
import PokemonTypeBadge from "./PokemonTypeBadge";

const PokemonDetail = () => {
  const { id } = useParams();
  const { data: pokemon, isLoading, error } = usePokemon(parseInt(id!));

  if (isLoading) return <Center height={'100vh'}><Spinner /></Center>

  if (error) return <Text>{error.message}</Text>

  return (
    <Card>
      <Link to={'/pokemons'}>
        <IconButton
          icon={<ArrowBackIcon boxSize={'30px'} />}
          variant={'ghost'}
          height={'70px'}
          width={'70px'}
          aria-label="back-button"
        />
      </Link>
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