import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button';

const meta: Meta<ButtonComponent> = {
  title: 'Primitives/Button',
  component: ButtonComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'keyboard-navigation', 'screen-reader'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
    fullWidth: { control: 'boolean' },
    role: { control: 'text' },
    ariaLabel: { control: 'text' },
    ariaDescribedBy: { control: 'text' },
    ariaExpanded: { control: 'boolean' },
    ariaPressed: { control: 'boolean' },
    ariaSelected: { control: 'boolean' },
    ariaControls: { control: 'text' },
    tabIndexOverride: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: { label: 'Primary Button', variant: 'primary', size: 'md' },
};
export const Secondary: Story = {
  args: { label: 'Secondary Button', variant: 'secondary', size: 'md' },
};
export const Ghost: Story = {
  args: { label: 'Ghost Button', variant: 'ghost', size: 'md' },
};
export const Danger: Story = {
  args: { label: 'Danger Button', variant: 'danger', size: 'md' },
};
export const Small: Story = {
  args: { label: 'Small', variant: 'primary', size: 'sm' },
};
export const Large: Story = {
  args: { label: 'Large', variant: 'primary', size: 'lg' },
};
export const Disabled: Story = {
  args: { label: 'Disabled', variant: 'primary', disabled: true },
};
export const FullWidth: Story = {
  args: { label: 'Full Width Button', variant: 'primary', fullWidth: true },
  render: (args) => ({
    props: args,
    template: `<div style="max-width:320px"><ui-button [label]="label" [variant]="variant" [fullWidth]="fullWidth"></ui-button></div>`,
  }),
};
export const SubmitType: Story = {
  args: { label: 'Submit', variant: 'primary', type: 'submit' },
};
export const AsToggle: Story = {
  name: 'Toggle (aria-pressed)',
  args: { label: 'Toggle Me', variant: 'secondary', role: 'button', ariaPressed: true },
};

export const Test1: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
};