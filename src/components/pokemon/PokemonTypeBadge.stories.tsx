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
        pokemon: {
            id: 1,
            name: 'Name',
            stats: [
                {
                    base_stat: 1,
                    stat: {
                        name: 'Stat'
                    }
                }
            ],
            cries: {
                latest: 'Latest',
                legacy: 'Legacy'
            },
            moves: [
                {
                    move: { name: 'Move' },
                    version_group_details: [{ level_learned_at: 1 }]
                }
            ],
            sprites: {
                other: {
                    'official-artwork': { front_default: 'Sprite' }
                }
            },
            types: [
                { type: { name: "fire" } }
            ]
        }
    }
}
