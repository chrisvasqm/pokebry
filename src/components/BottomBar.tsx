import {
  Box,
  Button,
  Circle,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon
} from '@chakra-ui/react';

interface Props {
  pokemonId: number;
  isLoaded: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: (e: any) => void;
  onSearch: (e: any) => void;
}

function BottomBar({ pokemonId, isLoaded, onNext, onPrevious, onSubmit, onSearch }: Props) {
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
          onClick={onPrevious}
          isLoading={!isLoaded}
          isDisabled={pokemonId <= 1}
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
          onClick={onNext}
          isLoading={!isLoaded}
        >
          Next
        </Button>
      </HStack>

      <form onSubmit={onSubmit}>
        <HStack className='section-search' align={'stretch'} gap={3}>
          <Box flex='12'>
            <FormControl borderWidth={0} backgroundColor={'white'} borderRadius={6}>
              <InputGroup textColor={'gray.800'}>
                <InputLeftAddon children='Search for: ' />
                <Input onChange={onSearch} />
              </InputGroup>
            </FormControl>
          </Box>
          <Button rounded={'full'} colorScheme='green' type='submit' isLoading={!isLoaded} />
        </HStack>
      </form>
    </>
  );
}

export default BottomBar;
