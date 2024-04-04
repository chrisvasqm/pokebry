import { Container } from '@chakra-ui/react';
import PokemonsContainer from './components/pokemon/PokemonContainer';

function App() {
  return (
    <Container paddingTop={4} size={['md', 'sm']}>
      <PokemonsContainer />
    </Container>
  );
}

export default App;
