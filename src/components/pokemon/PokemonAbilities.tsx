import { SimpleGrid, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { Moves } from "../../models/Pokemon";

interface Props {
    moves: Moves[]
}

const PokemonAbilities = ({ moves }: Props) => {
    return (
        <>
            <SimpleGrid columns={[2, 3]} gap={5} overflowY={'scroll'} height={'230px'}
                // Focusable so keyboard users can scroll the list; it holds no focusable items.
                tabIndex={0} role='region' aria-label='Moves'>
                {moves.map(({ move, version_group_details }) =>
                    <Stat id={`move-${move.name}`} key={move.name}>
                        <StatLabel id={`move-label-${move.name}`} color={'text.muted'}>Required level: {version_group_details[0].level_learned_at}</StatLabel>
                        <StatNumber id={`move-number-${move.name}`} fontSize={'md'}>{move.name.toUpperCase()}</StatNumber>
                    </Stat>)}
            </SimpleGrid >
        </>
    )
}

export default PokemonAbilities;