import { MoonIcon, SearchIcon } from "@chakra-ui/icons";
import { Button, Card, Container, HStack, Heading, IconButton, Kbd, Spacer, Switch, useColorMode, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaGithub } from 'react-icons/fa';
import { Link } from "react-router-dom";
import SearchModal from "./SearchModal";

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

const NavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

    useEffect(() => {
        const onKeyDown = (event: globalThis.KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                onToggle();
            }
        }
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [onToggle]);

    return (
        <Card id='navbar' borderRadius={0} boxShadow={'md'} position={'sticky'} top={0} zIndex={'sticky'}>
            <Container maxWidth={'4xl'}>
                <HStack>
                    <Heading marginY={2} as={'h1'} fontSize={'3xl'}>
                        <Link id='navbar-title' to='/'>Pokebry</Link>
                    </Heading>
                    <Spacer />
                    <Button
                        id='navbar-search'
                        variant={'outline'}
                        size={'sm'}
                        leftIcon={<SearchIcon />}
                        onClick={onOpen}
                        aria-label='Search Pokemon'>
                        <HStack spacing={1}>
                            <Kbd>{isMac ? '⌘' : 'Ctrl'}</Kbd>
                            <Kbd>K</Kbd>
                        </HStack>
                    </Button>
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
            <SearchModal isOpen={isOpen} onClose={onClose} />
        </Card>
    )
}

export default NavBar;
