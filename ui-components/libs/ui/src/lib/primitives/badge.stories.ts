import type { Meta, StoryObj } from '@storybook/angular';
import { BadgeComponent } from './badge';

const meta: Meta<BadgeComponent> = {
  title: 'Primitives/Badge',
  component: BadgeComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader', 'color-contrast'],
  argTypes: {
    variant: { control: 'select', options: ['primary','secondary','success','warning','error','neutral'] },
    size: { control: 'radio', options: ['sm','md','lg'] },
    label: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<BadgeComponent>;

export const Primary: Story = { args: { label: 'New', variant: 'primary' } };
export const Success: Story = { args: { label: 'Active', variant: 'success' } };
export const Warning: Story = { args: { label: 'Pending', variant: 'warning' } };
export const Error: Story = { args: { label: 'Failed', variant: 'error' } };
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <ui-badge label="Primary" variant="primary"></ui-badge>
        <ui-badge label="Secondary" variant="secondary"></ui-badge>
        <ui-badge label="Success" variant="success"></ui-badge>
        <ui-badge label="Warning" variant="warning"></ui-badge>
        <ui-badge label="Error" variant="error"></ui-badge>
        <ui-badge label="Neutral" variant="neutral"></ui-badge>
      </div>`,
    moduleMetadata: { imports: [BadgeComponent] },
  }),
};
