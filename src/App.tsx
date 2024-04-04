import { Container } from '@chakra-ui/react';
import PokemonsContainer from './components/pokemon/PokemonContainer';

function App() {
  return (
    <Container paddingY={4} paddingX={2} size={['md', 'sm']}>
      <PokemonsContainer />
    </Container>
  );
}

export default App;
