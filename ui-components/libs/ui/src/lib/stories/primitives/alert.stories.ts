import type { Meta, StoryObj } from '@storybook/angular';
import { AlertComponent } from '../../primitives/alert';

const meta: Meta<AlertComponent> = {
  title: 'Primitives/Alert',
  component: AlertComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader', 'color-contrast'],
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
    message: { control: 'text' },
    dismissible: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<AlertComponent>;

export const Info: Story = { args: { variant: 'info', title: 'Heads up', message: 'This is an informational message.' } };
export const Success: Story = { args: { variant: 'success', title: 'Done!', message: 'Your changes have been saved.' } };
export const Warning: Story = { args: { variant: 'warning', message: 'Your session will expire in 5 minutes.' } };
export const Error: Story = { args: { variant: 'error', title: 'Error', message: 'Something went wrong. Please try again.', dismissible: true } };