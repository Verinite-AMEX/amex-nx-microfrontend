// libs/ui/src/lib/stories/primitives/alert.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { AlertComponent } from '../../primitives/alert';

const meta: Meta<AlertComponent> = {
  title: 'Primitives/Alert',
  component: AlertComponent,
  tags: [
    'autodocs',
    'a11y',
    'accessibility',
    'wcag',
    'screen-reader',
    'color-contrast',
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'positive', 'warn'],
    },
    title: { control: 'text' },
    message: { control: 'text' },
    dismissible: { control: 'boolean' },
    dialog: { control: 'boolean' },
    dismissed: { action: 'dismissed' },
  },
};
export default meta;
type Story = StoryObj<AlertComponent>;

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    message: 'This is a neutral alert message.',
  },
};

export const Positive: Story = {
  args: {
    variant: 'positive',
    message: 'This is a positive alert message.',
  },
};

export const Warn: Story = {
  args: {
    variant: 'warn',
    message: 'This is a warning alert message.',
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'neutral',
    message: 'This alert can be dismissed.',
    dismissible: true,
  },
};

export const WithTitle: Story = {
  args: {
    variant: 'warn',
    title: 'Heads up',
    message: 'Your session will expire in 5 minutes.',
    dismissible: true,
  },
};

export const Dialog: Story = {
  name: 'Alert Dialog',
  args: {
    variant: 'neutral',
    dialog: true,
    message: 'This variant renders as a centered, block-level dialog alert.',
  },
};