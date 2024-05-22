import { MoonIcon } from "@chakra-ui/icons";
import { Card, Container, HStack, Heading, IconButton, Spacer, Switch, useColorMode } from "@chakra-ui/react";
import { FaGithub } from 'react-icons/fa';
import { Link } from "react-router-dom";

const NavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Card id='navbar' borderRadius={0} boxShadow={'md'}>
            <Container maxWidth={'4xl'}>
                <HStack>
                    <Heading marginY={2} as={'h1'} fontSize={'3xl'}>
                        <Link id='navbar-title' to='/'>Pokebry</Link>
                    </Heading>
                    <Spacer />
                    <a href='https://github.com/chrisvasqm/pokebry' target='_blank'>
                        <IconButton
                            variant={'ghost'}
                            aria-label='githubicon'
                            icon={<FaGithub size={20} />}
                        />
                    </a>
                    <Switch id='navbar-switch' isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
                    <MoonIcon id='navbar-moon-icon' marginLeft={1} />
                </HStack>
            </Container>
        </Card>
    )
}

export default NavBar;