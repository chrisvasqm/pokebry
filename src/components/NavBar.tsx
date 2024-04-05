import { ArrowBackIcon } from "@chakra-ui/icons";
import { Card, Heading, HStack, IconButton } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import useBackButtonStore from "../store/useBackButtonStore";

const NavBar = () => {
    const { isVisible, display, hide } = useBackButtonStore();
    const navigate = useNavigate();

    const onHide = () => {
        hide()
        navigate('/pokemons');
    }

    const onDisplay = () => {
        display()
    }

    return (
        <Card borderRadius={0} boxShadow={'md'}>
            <HStack>
                {isVisible &&
                    <IconButton
                        icon={<ArrowBackIcon boxSize={'25px'} />}
                        variant={'ghost'}
                        height={'55px'}
                        width={'55px'}
                        aria-label="back-button"
                        onClick={() => isVisible ? onHide() : onDisplay()} />}
                <Heading marginY={2} marginLeft={isVisible ? 1 : 4} as={'h1'} fontSize={'3xl'}>
                    <Link to='/pokemons'>PokéDex</Link>
                </Heading>
            </HStack>
        </Card>
    )
}

export default NavBar;