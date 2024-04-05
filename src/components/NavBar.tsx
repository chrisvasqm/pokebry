import { Card, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <Card borderRadius={0} boxShadow={'md'}>
            <Heading marginY={2} marginLeft={4} as={'h1'} fontSize={'3xl'}>
                <Link to='/pokemons'>PokéDex</Link>
            </Heading>
        </Card>
    )
}

export default NavBar;