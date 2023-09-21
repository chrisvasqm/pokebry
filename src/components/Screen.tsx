import { Box, Center, HStack, Heading, Square, VStack } from '@chakra-ui/react';

function Screen() {
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
      <Heading>Name</Heading>

      <HStack gap={10}>
        <Square minHeight={'50px'} minWidth={'50px'} backgroundColor={'gray'} />
        <Box>
          <p>
            <b>HP:</b> 100
          </p>
          <p>
            <b>Attack:</b> 100
          </p>
          <p>
            <b>Defense:</b> 100
          </p>
          <p>
            <b>Special-Attack:</b> 100
          </p>
          <p>
            <b>Special-Defense:</b> 100
          </p>
          <p>
            <b>Speed:</b> 100
          </p>
        </Box>
      </HStack>
    </VStack>
  );
}

export default Screen;
