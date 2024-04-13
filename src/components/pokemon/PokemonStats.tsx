import { SimpleGrid, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { Stats } from "../../models/Pokemon";

interface Props {
    stats: Stats[]
}

const PokemonStats = ({ stats }: Props) => {
    return (
        <SimpleGrid columns={[2, 3]} gap={5}>
            {stats.map(stat =>
                <Stat id={`stat-${stat.stat.name}`} key={stat.stat.name}>
                    <StatLabel id={`stat-label-${stat.stat.name}`} color={'gray.500'}>{stat.stat.name.toUpperCase()}</StatLabel>
                    <StatNumber id={`stat-number-${stat.stat.name}`}>{stats[0].base_stat}</StatNumber>
                </Stat>
            )}
        </SimpleGrid>
    )
}

export default PokemonStats;