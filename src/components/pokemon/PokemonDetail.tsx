import { ArrowBackIcon } from "@chakra-ui/icons";
import { Card, Center, IconButton, Skeleton, Text, VStack } from "@chakra-ui/react";
import { isHTTPError } from "ky";
import { Link, useLocation, useParams } from "react-router-dom";
import { capitalizeName } from "../../common";
import usePokemon from "../../hooks/usePokemon";
import PokemonArtwork from "./PokemonArtwork";
import PokemonTabs from "./PokemonTabs";
import PokemonTypeBadge from "./PokemonTypeBadge";

const hasStatus = (error: Error, status: number) => isHTTPError(error) && error.response.status === status;

const PokemonDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  // Back to the list the card was opened from, filter included; a direct open goes to the plain list.
  const listSearch = (location.state as { search?: string } | null)?.search ?? '';
  // Number, not parseInt: '1abc' or '25.9' must not resolve to a Pokemon.
  const pokemonId = Number(id);
  const { data: pokemon, isLoading, error } = usePokemon(pokemonId);

  // A non-numeric id is never fetched; both cases keep the Back button.
  const notFound = error || !Number.isInteger(pokemonId) || pokemonId <= 0;

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
      {notFound && <Text id='details-error' data-testid='details-error' padding={4}>{error && !hasStatus(error, 404) ? 'Could not load this Pokemon. Try again later.' : 'This Pokemon does not exist.'}</Text>}
      {!notFound && <Center>
        <VStack>
          {/* Keyed by id: failed image URLs are per Pokemon, not kept across navigations. */}
          <PokemonArtwork key={pokemonId} id={pokemonId} pokemon={pokemon} />
          {/* Placeholders keep the name and badge rows' height, so nothing shifts when the data arrives. */}
          <Skeleton isLoaded={!isLoading} minWidth={'120px'} minHeight={'30px'}>
            <Text id='details-name' data-testid='details-name' as={'h2'} fontSize={'xl'} fontWeight={'bold'}>{capitalizeName(pokemon?.name ?? '')}</Text>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} minWidth={'120px'} minHeight={'40px'}>
            <PokemonTypeBadge types={pokemon?.types ?? []} />
          </Skeleton>
        </VStack>
      </Center>}
      {pokemon && <PokemonTabs pokemon={pokemon} />}
    </Card>
  )
}

export default PokemonDetail