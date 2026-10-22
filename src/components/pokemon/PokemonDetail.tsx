import { ArrowBackIcon } from "@chakra-ui/icons";
import { Card, Center, IconButton, Skeleton, Text, VStack } from "@chakra-ui/react";
import { Link, useLocation, useParams } from "react-router-dom";
import { capitalizeName } from "../../common";
import usePokemon from "../../hooks/usePokemon";
import PokemonArtwork from "./PokemonArtwork";
import PokemonTabs from "./PokemonTabs";
import PokemonTypeBadge from "./PokemonTypeBadge";

const PokemonDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  // Back to the list the card was opened from, filter included; a direct open goes to the plain list.
  const listSearch = (location.state as { search?: string } | null)?.search ?? '';
  const pokemonId = parseInt(id!);
  const { data: pokemon, isLoading, error } = usePokemon(pokemonId);

  if (error) return <Text>{error.message}</Text>

  return (
    <Card>
      <IconButton
        as={Link}
        to={{ pathname: '/', search: listSearch }}
        id='details-button-back'
        data-testid='details-button-back'
        icon={<ArrowBackIcon boxSize={'30px'} />}
        variant={'ghost'}
        height={'70px'}
        width={'70px'}
        aria-label="Back to list"
      />
      <Center>
        <VStack>
          <PokemonArtwork id={pokemonId} />
          {/* Placeholders keep the name and badge rows' height, so nothing shifts when the data arrives. */}
          <Skeleton isLoaded={!isLoading} minWidth={'120px'} minHeight={'30px'}>
            <Text id='details-name' data-testid='details-name' as={'h2'} fontSize={'xl'} fontWeight={'bold'}>{capitalizeName(pokemon?.name ?? '')}</Text>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} minWidth={'120px'} minHeight={'40px'}>
            <PokemonTypeBadge types={pokemon?.types ?? []} />
          </Skeleton>
        </VStack>
      </Center>
      {pokemon && <PokemonTabs pokemon={pokemon} />}
    </Card>
  )
}

export default PokemonDetail