import { HStack, Circle, Flex } from '@chakra-ui/react';

function TopBar() {
  return (
    <HStack className='section-top'>
      <Circle backgroundColor={'#01FBFB'} size={'60px'} borderWidth={1} borderColor={'black'} />

      <Flex paddingBottom={10} gap={2}>
        <Circle backgroundColor={'#EE031D'} size={3} borderWidth={1} borderColor={'black'} />
        <Circle backgroundColor={'#FFEB3B'} size={3} borderWidth={1} borderColor={'black'} />
        <Circle backgroundColor={'#2FF901'} size={3} borderWidth={1} borderColor={'black'} />
      </Flex>
    </HStack>
  );
}

export default TopBar;
