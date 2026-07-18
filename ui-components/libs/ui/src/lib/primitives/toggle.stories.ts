import type { Meta, StoryObj } from '@storybook/angular';
import { ToggleComponent } from './toggle';

const meta: Meta<ToggleComponent> = {
  title: 'Primitives/Toggle',
  component: ToggleComponent,
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
type Story = StoryObj<ToggleComponent>;

export const Off: Story = { args: { label: 'Enable notifications' } };
export const On: Story = {
  render: (args) => ({
    props: { ...args, checked: true },
    template: `<ui-toggle [label]="label" [checked]="checked"></ui-toggle>`,
  }),
  args: { label: 'Dark mode' },
};
export const Disabled: Story = { args: { label: 'Disabled toggle', disabled: true } };