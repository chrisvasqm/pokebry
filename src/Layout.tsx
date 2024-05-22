import { Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

function Layout() {
  return (
    <>
      <NavBar />
      <Container paddingY={4} paddingX={2} maxWidth={'4xl'}>
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;
