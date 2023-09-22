import { Box, HStack, Heading, Image, VStack } from '@chakra-ui/react';
import Pokemon from '../models/Pokemon';

interface Props {
  pokemon: Pokemon | null;
}

function Screen({ pokemon }: Props) {
  const stats = {
    hp: pokemon?.stats[0].base_stat,
    attack: pokemon?.stats[1].base_stat,
    defense: pokemon?.stats[2].base_stat,
    specialAttack: pokemon?.stats[3].base_stat,
    specialDefense: pokemon?.stats[4].base_stat,
    speed: pokemon?.stats[5].base_stat
  };

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
      <Heading>
        {pokemon?.name.charAt(0).toUpperCase()}
        {pokemon?.name.slice(1)}
      </Heading>

      <HStack>
        <Image src={pokemon?.sprites.front_default} width={'150px'} height={'150px'} />
        <Box>
          <p>
            <b>HP:</b> {stats.hp}
          </p>
          <p>
            <b>Attack:</b> {stats.attack}
          </p>
          <p>
            <b>Defense:</b> {stats.defense}
          </p>
          <p>
            <b>Special-Attack:</b> {stats.specialAttack}
          </p>
          <p>
            <b>Special-Defense:</b> {stats.specialDefense}
          </p>
          <p>
            <b>Speed:</b> {stats.speed}
          </p>
        </Box>
      </HStack>
    </VStack>
  );
}

export default Screen;
