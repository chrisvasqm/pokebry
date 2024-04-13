import { SimpleGrid, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { Moves } from "../../models/Pokemon";

interface Props {
    moves: Moves[]
}

const PokemonAbilities = ({ moves }: Props) => {
    return (
        <>
            <SimpleGrid columns={[2, 3]} gap={5} overflowY={'scroll'} height={'230px'}>
                {moves.map(({ move, version_group_details }) =>
                    <Stat id={`move-${move.name}`} key={move.name}>
                        <StatLabel id={`move-label-${move.name}`} color={'gray.500'}>Required level: {version_group_details[0].level_learned_at}</StatLabel>
                        <StatNumber id={`move-number-${move.name}`} fontSize={'md'}>{move.name.toUpperCase()}</StatNumber>
                    </Stat>)}
            </SimpleGrid >
        </>
    )
}

export default PokemonAbilities;