import { Button, Center, Heading, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import FadeIn from "./motion/FadeIn"
import NavBar from "./NavBar"

const ErrorPage = () => {
    return (
        <>
            <NavBar />
            <Center height={'100vh'}>
                <FadeIn>
                    <VStack>
                        <Heading id='error-title' data-testid='error-title'>Oops!</Heading>
                        <Text id='error-message'>Seems like you have lost your way</Text>
                        <Link id='error-button-home' data-testid='error-button-home' to={'/'}><Button>Go Home</Button></Link>
                    </VStack>
                </FadeIn>
            </Center>
        </>
    )
}

export default ErrorPage