import type { Meta, StoryObj } from '@storybook/angular';
import { ProgressBarComponent } from './progress-bar';

const meta: Meta<ProgressBarComponent> = {
  title: 'Primitives/ProgressBar',
  component: ProgressBarComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader', 'color-contrast'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    variant: { control: 'select', options: ['primary','success','warning','error'] },
    height: { control: 'number' },
  
    label: { control: 'text' },
    showValue: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<ProgressBarComponent>;

export const Default: Story = { args: { value: 60, label: 'Upload progress', showValue: true } };
export const Success: Story = { args: { value: 100, variant: 'success', label: 'Complete', showValue: true } };
export const Indeterminate: Story = { args: { indeterminate: true, label: 'Loading...' } };
export const Thin: Story = { args: { value: 45, height: 4 } };