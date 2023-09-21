import { Square, HStack, Circle, Flex } from '@chakra-ui/react';

function Pokedex() {
  return (
    <Square placeContent={'start'} padding={8} borderRadius={5} backgroundColor={'#F00222'}>
      <HStack>
        <Circle backgroundColor={'#1CADD2'} size={'60px'} borderWidth={4} />

        <Flex paddingBottom={10} gap={2}>
          <Circle backgroundColor={'#EE031D'} size={3} borderWidth={2} borderColor={'black'} />
          <Circle backgroundColor={'#CEB900'} size={3} borderWidth={2} borderColor={'black'} />
          <Circle backgroundColor={'#217E44'} size={3} borderWidth={2} borderColor={'black'} />
        </Flex>
      </HStack>
    </Square>
  );
}

export default Pokedex;
