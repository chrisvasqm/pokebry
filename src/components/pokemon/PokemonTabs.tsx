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

    const panels = [
        { key: 'stats', title: 'Stats', content: <PokemonStats stats={pokemon.stats} /> },
        { key: 'abilities', title: 'Abilities', content: <PokemonAbilities moves={pokemon.moves} /> },
        { key: 'sounds', title: 'Sounds', content: <PokemonSounds cries={pokemon.cries} /> }
    ];

    return (
        <Tabs id='tab-container' marginX={2} marginY={2} variant='enclosed' isFitted index={index} onChange={setIndex}>
            <TabList>
                {panels.map(panel =>
                    <Tab id={`tab-${panel.key}-title`} data-testid={`tab-${panel.key}-title`} key={panel.key} fontWeight={'semibold'}>{panel.title}</Tab>)}
            </TabList>
            <TabPanels>
                {panels.map((panel, panelIndex) =>
                    <TabPanel id={`tab-${panel.key}-content`} data-testid={`tab-${panel.key}-content`} key={panel.key}>
                        <FadeIn isVisible={index === panelIndex}>{panel.content}</FadeIn>
                    </TabPanel>)}
            </TabPanels>
        </Tabs>
    )
}

export default PokemonTabs
