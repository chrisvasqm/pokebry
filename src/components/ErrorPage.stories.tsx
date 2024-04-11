import type { Meta, StoryObj } from '@storybook/react';

import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';

const meta: Meta<typeof ErrorPage> = {
    component: ErrorPage,
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

type Story = StoryObj<typeof ErrorPage>;

export const Default: Story = {}
