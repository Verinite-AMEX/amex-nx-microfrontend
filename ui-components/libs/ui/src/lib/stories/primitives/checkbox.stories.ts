import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from '../../primitives/checkbox';

const meta: Meta<CheckboxComponent> = {
  title: 'Primitives/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'form-validation', 'screen-reader', 'keyboard-navigation'],
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  
    ariaLabel: { control: 'text' },
    ariaDescribedBy: { control: 'text' },
    ariaInvalid: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Unchecked: Story = {
  args: { label: 'Accept terms and conditions' },
};

export const Checked: Story = {
  args: { label: 'I agree to the privacy policy' },
  render: (args) => ({
    props: { ...args, checked: true },
    template: `<ui-checkbox [label]="label" [disabled]="disabled" [checked]="checked"></ui-checkbox>`,
  }),
};

export const Disabled: Story = {
  args: { label: 'Disabled option', disabled: true },
};