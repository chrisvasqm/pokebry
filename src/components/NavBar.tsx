import { Card, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useTitleStore from "../store/useTitleStore";

const NavBar = () => {
    const title = useTitleStore(state => state.title)

    return (
        <Card paddingY={2} paddingX={4} borderRadius={0} boxShadow={'md'}>
            <Heading as={'h1'} fontSize={'2xl'}>
                <Link to='/pokemons'>{title}</Link>
            </Heading>
        </Card>
    )
}

export default NavBar;