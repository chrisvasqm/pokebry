import { SimpleGrid, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import Pokemon from "../../models/Pokemon";

interface Props {
    pokemon: Pokemon
}

const PokemonStats = ({ pokemon }: Props) => {
    return (
        <SimpleGrid columns={2} gap={6}>
            {pokemon.stats.map(stat =>
                <Stat key={stat.stat.name}>
                    <StatLabel color={'blue.500'}>{stat.stat.name.toUpperCase()}</StatLabel>
                    <StatNumber>{pokemon.stats[0].base_stat}</StatNumber>
                </Stat>
            )}
        </SimpleGrid>
    )
}

export default PokemonStats;