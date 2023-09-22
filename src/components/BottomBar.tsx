import { HStack, Circle, Flex, Square, FormControl, Input, Button, Box } from '@chakra-ui/react';

function BottomBar() {
  function handleSubmit(e: any) {
    e.preventDefault();
    console.log('Submitted a pokemon name');
  }

  return (
    <>
      <HStack className='section-bottom'>
        <Circle backgroundColor={'#519AFB'} size={'50px'} borderWidth={1} borderColor={'black'} />

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

      <form onSubmit={handleSubmit}>
        <HStack className='section-search' align={'stretch'} gap={3}>
          <Box flex='12'>
            <FormControl borderWidth={0} backgroundColor={'white'} borderRadius={6}>
              <Input placeholder='Search for...' />
            </FormControl>
          </Box>
          <Button rounded={'full'} colorScheme='green' onClick={handleSubmit} />
        </HStack>
      </form>
    </>
  );
}

export default BottomBar;
