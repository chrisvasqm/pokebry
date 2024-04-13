import { Button, Center, Heading, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import NavBar from "./NavBar"

const ErrorPage = () => {
    return (
        <>
            <NavBar />
            <Center height={'100vh'}>
                <VStack>
                    <Heading id='error-title'>Oops!</Heading>
                    <Text id='error-message'>Seems like you have lost your way</Text>
                    <Link id='error-button-home' to={'/pokemons'}><Button>Go Home</Button></Link>
                </VStack>
            </Center>
        </>
    )
}

export default ErrorPage