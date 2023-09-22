import { Container } from '@chakra-ui/react';
import Pokedex from './components/Pokedex';

function App() {
  return (
    <Container paddingTop={4} size={['md', 'sm']}>
      <Pokedex />
    </Container>
  );
}

export default App;
