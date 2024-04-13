import { Center, Heading, VStack } from "@chakra-ui/react";
import { Cries } from "../../models/Pokemon";

interface Props {
    cries: Cries
}

const PokemonSounds = ({ cries }: Props) => {
    return (
        <VStack gap={2} alignItems={'left'}>
            <Heading id='sounds-title-latest' as={'h2'} fontWeight={'medium'} fontSize={'lg'}>Latest</Heading>
            <Center>
                <audio id='audio-latest' controls>
                    <source src={cries.latest} type="audio/ogg" />
                </audio>
            </Center>

            <Heading id='sounds-title-legacy' as={'h2'} fontWeight={'medium'} fontSize={'lg'}>Legacy</Heading>
            <Center>
                <audio id='audio-legacy' controls>
                    <source src={cries.legacy} type="audio/ogg" />
                </audio>
            </Center>
        </VStack>
    )
}

export default PokemonSounds;