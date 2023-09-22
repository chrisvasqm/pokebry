import { Box, HStack, Heading, Square, VStack } from '@chakra-ui/react';
import Pokemon from '../models/Pokemon';

interface Props {
  pokemon: Pokemon | null;
}

function Screen({ pokemon }: Props) {
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
      <Heading>{pokemon?.name.charAt(0).toUpperCase()}{pokemon?.name.slice(1)}</Heading>

      <HStack gap={10}>
        <Square minHeight={'75px'} minWidth={'75px'} backgroundColor={'gray'} />
        <Box>
          <p>
            <b>HP:</b> {pokemon?.stats[0].base_stat}
          </p>
          <p>
            <b>Attack:</b> {pokemon?.stats[1].base_stat}
          </p>
          <p>
            <b>Defense:</b> {pokemon?.stats[2].base_stat}
          </p>
          <p>
            <b>Special-Attack:</b> {pokemon?.stats[3].base_stat}
          </p>
          <p>
            <b>Special-Defense:</b> {pokemon?.stats[4].base_stat}
          </p>
          <p>
            <b>Speed:</b> {pokemon?.stats[5].base_stat}
          </p>
        </Box>
      </HStack>
    </VStack>
  );
}

export default Screen;
