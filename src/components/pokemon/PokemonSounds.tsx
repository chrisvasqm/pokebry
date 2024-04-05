import { Center, Heading, VStack } from "@chakra-ui/react";
import Pokemon from "../../models/Pokemon";

interface Props {
    pokemon: Pokemon
}

const PokemonSounds = ({ pokemon }: Props) => {
    return (
        <VStack gap={2} alignItems={'left'}>
            <Heading as={'h2'} fontWeight={'medium'} fontSize={'lg'}>Latest</Heading>
            <Center>
                <audio controls>
                    <source src={pokemon.cries.latest} type="audio/ogg" />
                </audio>
            </Center>

            <Heading as={'h2'} fontWeight={'medium'} fontSize={'lg'}>Legacy</Heading>
            <Center>
                <audio controls>
                    <source src={pokemon.cries.legacy} type="audio/ogg" />
                </audio>
            </Center>
        </VStack>
    )
}

export default PokemonSounds;