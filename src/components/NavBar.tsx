import { Card, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useTitleStore from "../store/useTitleStore";
import { capitalizeName } from "../common";

const NavBar = () => {
    const title = useTitleStore(state => state.title)

    return (
        <Card paddingY={2} paddingX={4} borderRadius={0} boxShadow={'md'}>
            <Heading as={'h1'} fontSize={'3xl'}>
                <Link to='/pokemons'>{capitalizeName(title)}</Link>
            </Heading>
        </Card>
    )
}

export default NavBar;