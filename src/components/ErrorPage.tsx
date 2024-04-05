import { Button, Center, Heading, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import NavBar from "./NavBar"

const ErrorPage = () => {
    return (
        <>
            <NavBar />
            <Center height={'100vh'}>
                <VStack>
                    <Heading>Oops!</Heading>
                    <Text>Seems like you have lost your way</Text>
                    <Link to={'/pokemons'}><Button>Go Home</Button></Link>
                </VStack>
            </Center>
        </>
    )
}

export default ErrorPage