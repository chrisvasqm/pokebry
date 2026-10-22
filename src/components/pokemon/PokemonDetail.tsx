import { ArrowBackIcon } from "@chakra-ui/icons";
import { Card, Center, IconButton, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { Link, useLocation, useParams } from "react-router-dom";
import { capitalizeName } from "../../common";
import usePokemon from "../../hooks/usePokemon";
import PokemonTabs from "./PokemonTabs";
import PokemonTypeBadge from "./PokemonTypeBadge";

const PokemonDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  // Back to the list the card was opened from, filter included; a direct open goes to the plain list.
  const listSearch = (location.state as { search?: string } | null)?.search ?? '';
  const { data: pokemon, isLoading, error } = usePokemon(parseInt(id!));

  if (isLoading) return <Center height={'100vh'}><Spinner /></Center>

  if (error) return <Text>{error.message}</Text>

  return (
    <Card>
      <Link to={{ pathname: '/', search: listSearch }}>
        <IconButton
          id='details-button-back'
          data-testid='details-button-back'
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
            id='details-image'
            alt={capitalizeName(pokemon?.name || '')}
            src={pokemon?.sprites.other["official-artwork"].front_default || "/pokeball.png"}
            boxSize={'250px'}
          />
          <Text id='details-name' data-testid='details-name' as={'h2'} fontSize={'xl'} fontWeight={'bold'}>{capitalizeName(pokemon?.name || '')}</Text>
          <PokemonTypeBadge types={pokemon?.types || []} />
        </VStack>
      </Center>
      <PokemonTabs pokemon={pokemon!} />
    </Card>
  )
}

export default PokemonDetail