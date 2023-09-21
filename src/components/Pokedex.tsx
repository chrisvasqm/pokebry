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
      <Square placeContent={'start'} padding={6} borderRadius={5} backgroundColor={'#F00222'}>
        <VStack align={'left'}>
          <HStack className='section-top'>
            <Circle backgroundColor={'#01FBFB'} size={'60px'} borderWidth={4} />

            <Flex paddingBottom={10} gap={2}>
              <Circle backgroundColor={'#EE031D'} size={3} borderWidth={2} borderColor={'black'} />
              <Circle backgroundColor={'#CEB900'} size={3} borderWidth={2} borderColor={'black'} />
              <Circle backgroundColor={'#217E44'} size={3} borderWidth={2} borderColor={'black'} />
            </Flex>
          </HStack>

          <HStack className='section-bottom'>
            <Circle backgroundColor={'#519AFB'} size={'50px'} borderWidth={4} />

            <Flex paddingBottom={10} gap={2}>
              <Square
                backgroundColor={'#2FF901'}
                size={3}
                minHeight={5}
                borderRadius={10}
                borderWidth={2}
                borderColor={'black'}
                minWidth={'70px'}
              />
              <Square
                backgroundColor={'#CEB900'}
                size={3}
                minHeight={5}
                borderRadius={10}
                borderWidth={2}
                borderColor={'black'}
                minWidth={'70px'}
              />
            </Flex>
          </HStack>

          <HStack className='section-search' align={'stretch'} gap={2}>
            <Box>
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <Input placeholder='Search for...' />
                </FormControl>
              </form>
            </Box>

            <Button borderRadius={20} colorScheme='green' />
          </HStack>
        </VStack>
      </Square>
    </>
  );
}

export default Pokedex;
