import { Container } from '@chakra-ui/react';
import PokeDex from './components/Pokedex';

function App() {
  return (
    <Container paddingTop={4} size={['md', 'sm']}>
      <PokeDex />
    </Container>
  );
}

export default App;
