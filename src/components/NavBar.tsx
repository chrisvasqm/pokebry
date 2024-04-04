import { Card, Heading } from "@chakra-ui/react";
import useTitleStore from "../store/useTitleStore";

const NavBar = () => {
    const title = useTitleStore(state => state.title)

    return (
        <Card paddingY={2} paddingX={4} borderRadius={0} boxShadow={'md'}>
            <Heading fontSize={'2xl'}>{title}</Heading>
        </Card>
    )
}

export default NavBar;