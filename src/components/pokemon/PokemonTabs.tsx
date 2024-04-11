import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Pokemon from '../../models/Pokemon';
import PokemonSounds from "./PokemonSounds";
import PokemonAbilities from "./PokemonAbilities";
import PokemonStats from "./PokemonStats";

interface Props {
    pokemon: Pokemon
}

const PokemonTabs = ({ pokemon }: Props) => {
    return (
        <Tabs marginX={2} marginY={2} variant='enclosed' isFitted>
            <TabList>
                <Tab fontWeight={'semibold'}>Stats</Tab>
                <Tab fontWeight={'semibold'}>Abilities</Tab>
                <Tab fontWeight={'semibold'}>Sounds</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <PokemonStats stats={pokemon.stats} />
                </TabPanel>
                <TabPanel>
                    <PokemonAbilities moves={pokemon.moves} />
                </TabPanel>
                <TabPanel>
                    <PokemonSounds cries={pokemon.cries} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default PokemonTabs