import { HStack, Square } from '@chakra-ui/react';

function Screen() {
  return (
    <HStack className='section-middle' marginY={4}>
      <Square
        backgroundColor={'white'}
        borderRadius={6}
        borderWidth={10}
        borderColor={'gray.400'}
        minHeight={'400px'}
        minWidth={'100%'}
      >
        Hola
      </Square>
    </HStack>
  );
}

export default Screen;
