// libs/ui/src/lib/stories/primitives/progress-bar.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { ProgressBarComponent } from '../../primitives/progress-bar';

const meta: Meta<ProgressBarComponent> = {
  title: 'Primitives/ProgressBar',
  component: ProgressBarComponent,
  tags: [
    'autodocs',
    'a11y',
    'accessibility',
    'wcag',
    'screen-reader',
    'color-contrast',
  ],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    max: { control: 'number' },
    label: { control: 'text' },
    indeterminate: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<ProgressBarComponent>;

export const Default: Story = {
  args: { value: 60, label: 'Upload progress' },
};

export const Complete: Story = {
  args: { value: 100, label: 'Complete' },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, ariaLabel: 'Loading' },
};

export const CustomMax: Story = {
  name: 'Custom max value',
  args: { value: 6500, max: 20000, ariaLabel: 'Miles 6500 from 20000' },
};