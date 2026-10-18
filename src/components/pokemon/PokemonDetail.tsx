import { ArrowBackIcon } from "@chakra-ui/icons";
import { Card, Center, IconButton, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { capitalizeName } from "../../common";
import usePokemon from "../../hooks/usePokemon";
import PokemonTabs from "./PokemonTabs";
import PokemonTypeBadge from "./PokemonTypeBadge";

const PokemonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // Go back in history (keeping e.g. a type filter) when the app has one; a direct open goes home.
  const goBack = () => location.key === 'default' ? navigate('/') : navigate(-1);
  const { data: pokemon, isLoading, error } = usePokemon(parseInt(id!));

  if (isLoading) return <Center height={'100vh'}><Spinner /></Center>

  if (error) return <Text>{error.message}</Text>

  return (
    <Card>
      <IconButton
        id='details-button-back'
        data-testid='details-button-back'
        icon={<ArrowBackIcon boxSize={'30px'} />}
        variant={'ghost'}
        height={'70px'}
        width={'70px'}
        alignSelf={'flex-start'}
        onClick={goBack}
        aria-label="back-button"
      />
      <Center>
        <VStack>
          <Image
            id='details-image'
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