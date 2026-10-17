import { MoonIcon, SearchIcon } from "@chakra-ui/icons";
import { Button, Card, Container, HStack, Heading, IconButton, Kbd, Spacer, Switch, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaGithub } from 'react-icons/fa';
import { Link } from "react-router-dom";
import SearchModal from "./SearchModal";

const platform = typeof navigator === 'undefined'
    ? ''
    : (navigator as Navigator & { userAgentData?: { platform: string } }).userAgentData?.platform ?? navigator.platform;
const isMac = /Mac|iPhone|iPad/i.test(platform);

const NavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const onKeyDown = (event: globalThis.KeyboardEvent) => {
            const isShortcut = (event.metaKey || event.ctrlKey) && !event.shiftKey && !event.altKey && event.key.toLowerCase() === 'k';
            if (isShortcut) {
                event.preventDefault();
                setIsOpen(open => !open);
            }
        }
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    return (
        <Card id='navbar' borderRadius={0} boxShadow={'md'} position={'sticky'} top={0} zIndex={'sticky'}>
            <Container maxWidth={'4xl'}>
                <HStack>
                    <Heading marginY={2} as={'h1'} fontSize={'3xl'}>
                        <Link id='navbar-title' data-testid='navbar-title' to='/'>Pokebry</Link>
                    </Heading>
                    <Spacer />
                    <Button
                        id='navbar-search'
                        data-testid='navbar-search'
                        variant={'outline'}
                        size={'sm'}
                        leftIcon={<SearchIcon />}
                        onClick={() => setIsOpen(true)}
                        aria-label='Search Pokemon'>
                        <HStack spacing={1} display={{ base: 'none', md: 'flex' }}>
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
                    <Switch id='navbar-switch' data-testid='navbar-switch' isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
                    <MoonIcon id='navbar-moon-icon' marginLeft={1} />
                </HStack>
            </Container>
            <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </Card>
    )
}

export default NavBar;
