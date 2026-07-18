import type { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent } from '../../primitives/select';

const COUNTRIES = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
];

const meta: Meta<SelectComponent> = {
  title: 'Primitives/Select',
  component: SelectComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'form-validation', 'screen-reader', 'keyboard-navigation'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
  
    options: { control: 'object' },
    invalid: { control: 'boolean' },
    required: { control: 'boolean' },
    readonly: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    ariaLabelledBy: { control: 'text' },
    ariaDescribedBy: { control: 'text' },
    nativeAppearance: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

export const Default: Story = {
  args: { options: COUNTRIES, placeholder: 'Select a country' },
};

export const WithError: Story = {
  args: { options: COUNTRIES, placeholder: 'Select a country', error: 'Please select an option' },
};

export const Disabled: Story = {
  args: { options: COUNTRIES, placeholder: 'Select a country', disabled: true },
};