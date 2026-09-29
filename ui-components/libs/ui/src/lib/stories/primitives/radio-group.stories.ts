// libs/ui/src/lib/stories/primitives/radio-group.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { RadioGroupComponent } from '../../primitives/radio-group';

const SIZES = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
];

const meta: Meta<RadioGroupComponent> = {
  title: 'Primitives/RadioGroup',
  component: RadioGroupComponent,
  tags: [
    'autodocs',
    'a11y',
    'accessibility',
    'wcag',
    'form-validation',
    'screen-reader',
    'keyboard-navigation',
  ],
  argTypes: {
    disabled: { control: 'boolean' },
    options: { control: 'object' },
    name: { control: 'text' },
    legend: { control: 'text' },
    ariaDescribedBy: { control: 'text' },
    required: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<RadioGroupComponent>;

export const Default: Story = {
  args: { options: SIZES, name: 'size', legend: 'Choose a size' },
};

export const NoVisibleLegend: Story = {
  name: 'No visible legend (screen-reader only)',
  args: { options: SIZES, name: 'size-sr' },
};

export const Disabled: Story = {
  args: { options: SIZES, name: 'size-d', legend: 'Choose a size', disabled: true },
};

export const Invalid: Story = {
  args: {
    options: SIZES,
    name: 'size-invalid',
    legend: 'Choose a size',
    invalid: true,
  },
};