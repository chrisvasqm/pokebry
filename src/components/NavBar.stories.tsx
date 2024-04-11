import type { Meta, StoryObj } from '@storybook/react';

import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';

const meta: Meta<typeof NavBar> = {
    component: NavBar,
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

type Story = StoryObj<typeof NavBar>;

export const Default: Story = {}
