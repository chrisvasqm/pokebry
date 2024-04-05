import { MoonIcon } from "@chakra-ui/icons";
import { Card, HStack, Heading, Spacer, Switch, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Card borderRadius={0} boxShadow={'md'}>
            <HStack>
                <Heading marginY={2} marginLeft={4} as={'h1'} fontSize={'3xl'}>
                    <Link to='/pokemons'>Pokebry</Link>
                </Heading>
                <Spacer />
                <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
                <MoonIcon marginLeft={1} marginRight={4} />
            </HStack>
        </Card>
    )
}

export default NavBar;