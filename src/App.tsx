import { Container, Heading } from '@chakra-ui/react';
import Pokedex from './components/Pokedex';

function App() {
  return (
    <Container size={['md', 'sm']}>
      <Heading>Pokedex App</Heading>
      <Pokedex />
    </Container>
  );
}

export default App;
