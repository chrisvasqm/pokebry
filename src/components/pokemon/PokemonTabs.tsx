import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Pokemon from '../../models/Pokemon';
import PokemonSounds from "../PokemonSounds";
import PokemonAbilities from "./PokemonAbilities";
import PokemonStats from "./PokemonStats";

interface Props {
    pokemon: Pokemon
}

const PokemonTabs = ({ pokemon }: Props) => {
    return (
        <Tabs marginX={2} marginY={2} variant='soft-rounded' isFitted>
            <TabList>
                <Tab>Stats</Tab>
                <Tab>Abilities</Tab>
                <Tab>Sounds</Tab>
                
            </TabList>
            <TabPanels>
                <TabPanel>
                    <PokemonStats pokemon={pokemon} />
                </TabPanel>
                <TabPanel>
                    <PokemonAbilities pokemon={pokemon} />
                </TabPanel>
                <TabPanel>
                    <PokemonSounds pokemon={pokemon} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default PokemonTabs