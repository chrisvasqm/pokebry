import { HStack, Circle, FormControl, Input, Button, Box } from '@chakra-ui/react';

function BottomBar() {
  function handleSubmit(e: any) {
    e.preventDefault();
    console.log('Submitted a pokemon name');
  }

  return (
    <>
      <HStack className='section-bottom' gap={2}>
        <Circle backgroundColor={'#5D5E60'} size={'50px'} borderWidth={1} borderColor={'black'} />

        <Button
          colorScheme={'blue'}
          minHeight={5}
          borderRadius={10}
          borderWidth={1}
          borderColor={'black'}
          minWidth={'70px'}
        >
          Previous
        </Button>

        <Button
          colorScheme={'blue'}
          minHeight={5}
          textColor={'white'}
          borderRadius={10}
          borderWidth={1}
          borderColor={'black'}
          minWidth={'70px'}
        >
          Next
        </Button>
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
