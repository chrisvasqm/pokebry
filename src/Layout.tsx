import { Container } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { useLocation, useOutlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import TypeFilter from './components/pokemon/TypeFilter';
import PageTransition from './components/motion/PageTransition';

function Layout() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <>
      <NavBar>
        {location.pathname === '/' && <TypeFilter />}
      </NavBar>
      <Container paddingY={4} paddingX={2} maxWidth={'4xl'}>
        <AnimatePresence mode='wait'>
          <PageTransition key={location.pathname}>
            {outlet}
          </PageTransition>
        </AnimatePresence>
      </Container>
    </>
  );
}

export default Layout;
