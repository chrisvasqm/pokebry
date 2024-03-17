import { Box, HStack, Heading, Image, Skeleton, SkeletonText, VStack, Text } from '@chakra-ui/react';
import Pokemon from '../models/Pokemon';

interface Props {
  pokemon?: Pokemon;
  isLoaded: boolean;
}

function Screen({ pokemon, isLoaded }: Props) {
  const stats = {
    hp: pokemon?.stats[0].base_stat,
    attack: pokemon?.stats[1].base_stat,
    defense: pokemon?.stats[2].base_stat,
    specialAttack: pokemon?.stats[3].base_stat,
    specialDefense: pokemon?.stats[4].base_stat,
    speed: pokemon?.stats[5].base_stat
  };

  function formatTypes(pokemon: Pokemon) {
    const types = pokemon?.types;

    if (types.length > 1) {
      let formattedTypes = types[0].type.name;

      types.slice(1).forEach(type => (formattedTypes += `, ${type.type.name}`));

      return formattedTypes;
    }

    return types[0].type.name;
  }

  return (
    <VStack
      className='section-middle'
      marginY={4}
      backgroundColor={'white'}
      borderRadius={6}
      borderWidth={10}
      padding={6}
      gap={10}
      borderColor={'gray.400'}
      minHeight={'360px'}
      minWidth={'100%'}
    >
      <Skeleton isLoaded={isLoaded}>
        <Heading>
          {pokemon?.name.charAt(0).toUpperCase()}
          {pokemon?.name.slice(1)}
        </Heading>
      </Skeleton>

      <HStack>
        <Skeleton isLoaded={isLoaded}>
          <Image
            src={pokemon?.sprites.front_default || '../../images/pokeball.png'}
            borderRadius={'full'}
            width={'150px'}
            height={'150px'}
          />
        </Skeleton>
        <SkeletonText isLoaded={isLoaded}>
          <Box textColor={'gray.800'}>
            <Text>
              <Text as='b'>Type:</Text> {pokemon && formatTypes(pokemon)}
            </Text>
            <Text>
              <Text as='b'>HP:</Text> {stats.hp}
            </Text>
            <Text>
              <Text as='b'>Attack:</Text> {stats.attack}
            </Text>
            <Text>
              <Text as='b'>Defense:</Text> {stats.defense}
            </Text>
            <Text>
              <Text as='b'>Special-Attack:</Text> {stats.specialAttack}
            </Text>
            <Text>
              <Text as='b'>Special-Defense:</Text> {stats.specialDefense}
            </Text>
            <Text>
              <Text as='b'>Speed:</Text> {stats.speed}
            </Text>
          </Box>
        </SkeletonText>
      </HStack>
    </VStack>
  );
}

export default Screen;
