import {
  Button,
  Center,
  Circle,
  HStack
} from '@chakra-ui/react';
import { MdArrowBack, MdArrowForward } from "react-icons/md";


interface Props {
  pokemonId: number;
  isLoaded: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

function BottomBar({ pokemonId, isLoaded, onNext, onPrevious }: Props) {
  return (
    <>
      <HStack width={100} className='section-bottom' gap={2}>
        <Circle backgroundColor={'#5D5E60'} size={'50px'} borderWidth={1} borderColor={'black'} />

        <Center gap={2}>
          <Button
            colorScheme='green'
            minHeight={5}
            borderRadius={10}
            borderWidth={1}
            borderColor={'black'}
            minWidth={'70px'}
            onClick={onPrevious}
            isLoading={!isLoaded}
            isDisabled={pokemonId <= 1}
          >
            <MdArrowBack />
          </Button>

          <Button
            colorScheme='green'
            minHeight={5}
            borderRadius={10}
            borderWidth={1}
            borderColor={'black'}
            minWidth={'70px'}
            onClick={onNext}
            isLoading={!isLoaded}
          >
            <MdArrowForward />
          </Button>
        </Center>
      </HStack>
    </>
  );
}

export default BottomBar;
