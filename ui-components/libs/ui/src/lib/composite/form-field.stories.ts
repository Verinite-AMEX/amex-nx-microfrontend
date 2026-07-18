import type { Meta, StoryObj } from '@storybook/angular';
import { FormFieldComponent } from './form-field';
import { InputComponent } from '../primitives/input';
import { SelectComponent } from '../primitives/select';
import { CheckboxComponent } from '../primitives/checkbox';

const meta: Meta<FormFieldComponent> = {
  title: 'Composite/FormField',
  component: FormFieldComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'form-validation', 'screen-reader', 'keyboard-navigation'],
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
  
    forId: { control: 'text' },
    layout: { control: 'select', options: ['vertical', 'horizontal'] },
    labelWidth: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<FormFieldComponent>;

export const WithInput: Story = {
  args: { label: 'Email address', hint: 'We will never share your email', required: true },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [InputComponent] },
    template: `
      <ui-form-field [label]="label" [hint]="hint" [required]="required">
        <ui-input type="email" placeholder="you@example.com"></ui-input>
      </ui-form-field>
    `,
  }),
};

export const WithError: Story = {
  args: { label: 'Username', error: 'Username is already taken', required: true },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [InputComponent] },
    template: `
      <ui-form-field [label]="label" [error]="error" [required]="required">
        <ui-input type="text" placeholder="Choose a username" [error]="error"></ui-input>
      </ui-form-field>
    `,
  }),
};

export const WithSelect: Story = {
  args: { label: 'Country', hint: 'Select your country of residence' },
  render: (args) => ({
    props: {
      ...args,
      options: [
        { label: 'United States', value: 'us' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'Canada', value: 'ca' },
      ],
    },
    moduleMetadata: { imports: [SelectComponent] },
    template: `
      <ui-form-field [label]="label" [hint]="hint">
        <ui-select [options]="options" placeholder="Select country"></ui-select>
      </ui-form-field>
    `,
  }),
};

export const WithCheckbox: Story = {
  args: { label: '' },
  render: () => ({
    moduleMetadata: { imports: [CheckboxComponent] },
    template: `
      <ui-form-field>
        <ui-checkbox label="Subscribe to newsletter"></ui-checkbox>
      </ui-form-field>
    `,
  }),
};