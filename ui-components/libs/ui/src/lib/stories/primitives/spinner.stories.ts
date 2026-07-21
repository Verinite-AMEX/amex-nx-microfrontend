import type { Meta, StoryObj } from '@storybook/angular';
import { SpinnerComponent } from '../../primitives/spinner';

const meta: Meta<SpinnerComponent> = {
  title: 'Primitives/Spinner',
  component: SpinnerComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader', 'color-contrast'],
  argTypes: {
    size: { control: 'radio', options: ['sm','md','lg'] },
    color: { control: 'color' },
  },
};
export default meta;
type Story = StoryObj<SpinnerComponent>;

export const Default: Story = { args: { size: 'md', color: '#1976d2' } };
export const Large: Story = { args: { size: 'lg', color: '#4caf50' } };
export const Sizes: Story = {
  render: () => ({
    template: `<div style="display:flex;gap:16px;align-items:center"><ui-spinner size="sm"></ui-spinner><ui-spinner size="md"></ui-spinner><ui-spinner size="lg"></ui-spinner></div>`,
    moduleMetadata: { imports: [SpinnerComponent] },
  }),
};
