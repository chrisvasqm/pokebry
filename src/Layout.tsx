import { Container } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';

function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/pokemons')
  }, [navigate])

  return (
    <>
      <NavBar />
      <Container paddingY={4} paddingX={2} size={['md', 'sm']}>
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;
