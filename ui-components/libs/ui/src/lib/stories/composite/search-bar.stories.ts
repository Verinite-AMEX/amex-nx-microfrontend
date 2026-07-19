import type { Meta, StoryObj } from '@storybook/angular';
import { SearchBarComponent } from '../../composite/search-bar';

const meta: Meta<SearchBarComponent> = {
  title: 'Composite/SearchBar',
  component: SearchBarComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'form-validation', 'screen-reader', 'keyboard-navigation'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<SearchBarComponent>;

export const Default: Story = { args: { placeholder: 'Search products...' } };
export const Disabled: Story = { args: { placeholder: 'Search...', disabled: true } };