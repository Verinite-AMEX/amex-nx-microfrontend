import type { Meta, StoryObj } from '@storybook/angular';
import { IconButtonComponent } from '../../primitives/icon-button';

const meta: Meta<IconButtonComponent> = {
  title: 'Primitives/IconButton',
  component: IconButtonComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader', 'keyboard-navigation'],
  argTypes: {
    variant: { control: 'radio', options: ['primary','ghost','danger'] },
    size: { control: 'radio', options: ['sm','md','lg'] },
    icon: { control: 'text' },
    clicked: { action: 'clicked' },
  
    ariaLabel: { control: 'text' },
    ariaDescribedBy: { control: 'text' },
    ariaPressed: { control: 'object' },
    ariaExpanded: { control: 'object' },
    disabled: { control: 'boolean' },
    role: { control: 'text' },
    ariaSelected: { control: 'object' },
    ariaControls: { control: 'text' },
    tabIndexOverride: { control: 'number' },
  },
};
export default meta;
type Story = StoryObj<IconButtonComponent>;

export const Ghost: Story = { args: { icon: '??', ariaLabel: 'Edit', variant: 'ghost'} };
export const Primary: Story = { args: { icon: '+', ariaLabel: 'Add', variant: 'primary'} };
export const Danger: Story = { args: { icon: '??', ariaLabel: 'Delete', variant: 'danger'} };
export const Disabled: Story = { args: { icon: '??', ariaLabel: 'Edit', disabled: true } };