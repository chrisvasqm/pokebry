import {
  Square,
  HStack,
  Circle,
  Flex,
  FormControl,
  Input,
  VStack,
  Box,
  Button
} from '@chakra-ui/react';

function Pokedex() {
  function handleSubmit(e: any) {
    e.preventDefault();
    console.log('Submitted a pokemon name');
  }

  return (
    <>
      <Square
        borderTopLeftRadius={15}
        borderTopRightRadius={0}
        borderBottomLeftRadius={15}
        borderBottomRightRadius={0}
        placeContent={'start'}
        padding={6}
        backgroundColor={'#F00222'}
        boxShadow="10px 10px 10px rgba(0, 0, 0, 0.4)"
      >
        <VStack align={'left'} width={'100%'}>
          <HStack className='section-top'>
            <Circle
              backgroundColor={'#01FBFB'}
              size={'60px'}
              borderWidth={1}
              borderColor={'black'}
            />

            <Flex paddingBottom={10} gap={2}>
              <Circle backgroundColor={'#EE031D'} size={3} borderWidth={1} borderColor={'black'} />
              <Circle backgroundColor={'#FFEB3B'} size={3} borderWidth={1} borderColor={'black'} />
              <Circle backgroundColor={'#2FF901'} size={3} borderWidth={1} borderColor={'black'} />
            </Flex>
          </HStack>

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

          <HStack className='section-bottom'>
            <Circle
              backgroundColor={'#519AFB'}
              size={'50px'}
              borderWidth={1}
              borderColor={'black'}
            />

            <Flex paddingBottom={10} gap={2}>
              <Square
                backgroundColor={'#2FF901'}
                size={3}
                minHeight={5}
                borderRadius={10}
                borderWidth={1}
                borderColor={'black'}
                minWidth={'70px'}
              />
              <Square
                backgroundColor={'#FFEB3B'}
                size={3}
                minHeight={5}
                borderRadius={10}
                borderWidth={1}
                borderColor={'black'}
                minWidth={'70px'}
              />
            </Flex>
          </HStack>

          <HStack className='section-search' align={'stretch'} gap={3}>
            <Box flex='12'>
              <form onSubmit={handleSubmit}>
                <FormControl borderWidth={0} backgroundColor={'white'} borderRadius={6}>
                  <Input placeholder='Search for...' />
                </FormControl>
              </form>
            </Box>

            <Button rounded={'full'} colorScheme='green' />
          </HStack>
        </VStack>
      </Square>
    </>
  );
}

export default Pokedex;
