import { Box, Center, HStack, Heading, Square, VStack } from '@chakra-ui/react';

function Screen() {
  return (
    <HStack
      className='section-middle'
      marginY={4}
      backgroundColor={'white'}
      borderRadius={6}
      borderWidth={10}
      borderColor={'gray.400'}
      minHeight={'400px'}
      minWidth={'100%'}
    >
      <VStack>
        <Center flex={2}>
          <Heading>Name</Heading>
        </Center>

        <HStack>
          <Square minHeight={'50px'} minWidth={'50px'} backgroundColor={'gray'} />
          <Box>
            <p>HP: 100</p>
            <p>Attack: 100</p>
            <p>Defense: 100</p>
            <p>Special-Attack: 100</p>
            <p>Special-Defense: 100</p>
            <p>Speed: 100</p>
          </Box>
        </HStack>
      </VStack>
    </HStack>
  );
}

export default Screen;
