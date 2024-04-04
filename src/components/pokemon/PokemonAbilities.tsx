import { SimpleGrid, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import Pokemon from "../../models/Pokemon";

interface Props {
    pokemon: Pokemon
}

const PokemonAbilities = ({ pokemon }: Props) => {
    return (
        <>
            <SimpleGrid columns={2} gap={5}>
                {pokemon.moves.map(({ move, version_group_details }) =>
                    <Stat key={move.name}>
                        <StatLabel color={'gray.500'}>Required level: {version_group_details[0].level_learned_at}</StatLabel>
                        <StatNumber fontSize={'md'}>{move.name.toUpperCase()}</StatNumber>
                    </Stat>)}
            </SimpleGrid >
        </>
    )
}

export default PokemonAbilities;