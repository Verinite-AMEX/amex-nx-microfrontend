import type { Preview } from '@storybook/angular';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Docs', ['Introduction', 'Release Notes'], 'Primitives', 'Composite', 'Patterns'],
      },
    },
  },
};

export default preview;