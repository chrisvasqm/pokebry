import { Card, Heading } from "@chakra-ui/react";

const NavBar = () => {
    return (
        <Card paddingY={2} paddingX={4} borderRadius={0} boxShadow={'md'}>
            <Heading fontSize={'2xl'}>PokéDex</Heading>
        </Card>
    )
}

export default NavBar;