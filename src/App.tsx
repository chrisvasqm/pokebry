import { Container } from '@chakra-ui/react';
import PokeDex from './components/PokeDex';

function App() {
  return (
    <Container paddingTop={4} size={['md', 'sm']}>
      <PokeDex />
    </Container>
  );
}

export default App;
