import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Pokemon from '../../models/Pokemon';
import PokemonAbilities from "./PokemonAbilities";
import PokemonSounds from "./PokemonSounds";
import PokemonStats from "./PokemonStats";

interface Props {
    pokemon: Pokemon
}

const PokemonTabs = ({ pokemon }: Props) => {
    return (
        <Tabs id='tab-container' marginX={2} marginY={2} variant='enclosed' isFitted>
            <TabList>
                <Tab id='tab-stats-title' fontWeight={'semibold'}>Stats</Tab>
                <Tab id='tab-abilities-title' fontWeight={'semibold'}>Abilities</Tab>
                <Tab id='tab-sounds-title' fontWeight={'semibold'}>Sounds</Tab>
            </TabList>
            <TabPanels>
                <TabPanel id='tab-stats-content'>
                    <PokemonStats stats={pokemon.stats} />
                </TabPanel>
                <TabPanel id='tab-abilities-content'>
                    <PokemonAbilities moves={pokemon.moves} />
                </TabPanel>
                <TabPanel id='tab-sounds-content'>
                    <PokemonSounds cries={pokemon.cries} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default PokemonTabs