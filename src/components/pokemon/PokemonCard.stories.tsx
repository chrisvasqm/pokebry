import type { Meta, StoryObj } from '@storybook/react';

import PokemonCard from './PokemonCard';

const meta: Meta<typeof PokemonCard> = {
    component: PokemonCard,
}

export default meta;

type Story = StoryObj<typeof PokemonCard>;

export const Default: Story = {
    args: {
        result: {
            name: 'Bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1'
        }
    }
}