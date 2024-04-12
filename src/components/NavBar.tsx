import { MoonIcon } from "@chakra-ui/icons";
import { Card, Container, HStack, Heading, Spacer, Switch, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Card borderRadius={0} boxShadow={'md'}>
            <Container maxWidth={'4xl'} paddingX={2}>
                <HStack>
                    <Heading marginY={2} as={'h1'} fontSize={'3xl'}>
                        <Link to='/pokemons'>Pokebry</Link>
                    </Heading>
                    <Spacer />
                    <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
                    <MoonIcon marginLeft={1} />
                </HStack>
            </Container>
        </Card>
    )
}

export default NavBar;