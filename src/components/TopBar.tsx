import { HStack, Circle, Flex } from '@chakra-ui/react';

function TopBar() {
  return (
    <HStack className='section-top'>
      <Circle backgroundColor={'#01FBFB'} size={'75px'} borderWidth={6} borderColor={'gray.400'} />

      <Flex paddingBottom={10} gap={3}>
        <Circle backgroundColor={'#EE031D'} size={5} borderWidth={1} borderColor={'black'} />
        <Circle backgroundColor={'#FFEB3B'} size={5} borderWidth={1} borderColor={'black'} />
        <Circle backgroundColor={'#2FF901'} size={5} borderWidth={1} borderColor={'black'} />
      </Flex>
    </HStack>
  );
}

export default TopBar;
