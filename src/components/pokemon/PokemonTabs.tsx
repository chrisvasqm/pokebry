import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useState } from "react";
import Pokemon from '../../models/Pokemon';
import FadeIn from "../motion/FadeIn";
import PokemonAbilities from "./PokemonAbilities";
import PokemonSounds from "./PokemonSounds";
import PokemonStats from "./PokemonStats";

interface Props {
    pokemon: Pokemon
}

const PokemonTabs = ({ pokemon }: Props) => {
    const [index, setIndex] = useState(0);

    return (
        <Tabs id='tab-container' marginX={2} marginY={2} variant='enclosed' isFitted index={index} onChange={setIndex}>
            <TabList>
                <Tab id='tab-stats-title' fontWeight={'semibold'}>Stats</Tab>
                <Tab id='tab-abilities-title' fontWeight={'semibold'}>Abilities</Tab>
                <Tab id='tab-sounds-title' fontWeight={'semibold'}>Sounds</Tab>
            </TabList>
            <TabPanels>
                <TabPanel id='tab-stats-content'>
                    <FadeIn isVisible={index === 0}><PokemonStats stats={pokemon.stats} /></FadeIn>
                </TabPanel>
                <TabPanel id='tab-abilities-content'>
                    <FadeIn isVisible={index === 1}><PokemonAbilities moves={pokemon.moves} /></FadeIn>
                </TabPanel>
                <TabPanel id='tab-sounds-content'>
                    <FadeIn isVisible={index === 2}><PokemonSounds cries={pokemon.cries} /></FadeIn>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default PokemonTabs
