// libs/ui/src/lib/stories/primitives/select.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent } from '../../primitives/select';
import { FormsModule } from '@angular/forms';

const COUNTRIES = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
];

const ACCOUNTS = [
  { label: 'Account Starting in 6524', value: '1', twoLinedLabel: 'Main Account' },
  { label: 'Account Starting in 9854', value: '2', twoLinedLabel: 'Secondary Account' },
  { label: 'Account Starting in 8673', value: '3', twoLinedLabel: 'Tertiary Account' },
];

const meta: Meta<SelectComponent> = {
  title: 'Primitives/Select',
  component: SelectComponent,
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
    options: { control: 'object' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    label: { control: 'text' },
    hint: { control: 'text' },
    formControl: { control: 'boolean' },
    twoLined: { control: 'boolean' },
    warningMessage: { control: 'text' },
    ariaLabel: { control: 'text' },
    ariaLabelledBy: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

export const Default: Story = {
  args: {
    label: 'Label text',
    options: COUNTRIES,
    placeholder: 'Select a country',
  },
};

export const SelectedItem: Story = {
  name: 'Selected item',
  args: {
    label: 'Label text',
    options: COUNTRIES,
    placeholder: 'Select a country',
  },
  render: (args) => ({
    props: { ...args, value: 'uk' },
    template: `<ui-select [options]="options" [label]="label" [placeholder]="placeholder" [ngModel]="value"></ui-select>`,
    moduleMetadata: { imports: [FormsModule] },
  }),
};

export const RequiredWithWarning: Story = {
  name: 'Required (shows warning on empty selection)',
  args: {
    label: 'Label text',
    hint: 'Hint text',
    options: COUNTRIES,
    placeholder: 'Select a country',
    required: true,
    warningMessage: 'A selection is required',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Label text',
    options: COUNTRIES,
    placeholder: 'Select a country',
    disabled: true,
  },
};

export const TwoLined: Story = {
  name: 'Two-Lined Dropdown',
  args: {
    label: 'Bank account',
    options: ACCOUNTS,
  },
};

export const TwoLinedRequired: Story = {
  name: 'Two-Lined Dropdown (required)',
  args: {
    label: 'Bank account',
    options: ACCOUNTS,
    required: true,
  },
};