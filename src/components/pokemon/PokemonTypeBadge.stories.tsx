import type { Meta, StoryObj } from '@storybook/react';

import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router-dom';
import PokemonTypeBadge from './PokemonTypeBadge';

const meta: Meta<typeof PokemonTypeBadge> = {
    component: PokemonTypeBadge,
    decorators: [
        (Story) => (
            <ChakraProvider>
                <MemoryRouter>
                    <Story />
                </MemoryRouter>
            </ChakraProvider>
        )
    ]
}

export default meta;

type Story = StoryObj<typeof PokemonTypeBadge>;

export const Default: Story = {
    args: {
        types: [{ type: { name: "fire" } }, { type: { name: "poison" } }]
    }
}
