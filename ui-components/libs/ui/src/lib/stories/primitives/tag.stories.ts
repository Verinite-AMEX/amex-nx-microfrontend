import type { Meta, StoryObj } from '@storybook/angular';
import { TagComponent } from '../../primitives/tag';

const meta: Meta<TagComponent> = {
  title: 'Primitives/Tag',
  component: TagComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'keyboard-navigation', 'screen-reader'],
  argTypes: {
    variant: { control: 'select', options: ['primary','secondary','success','warning','error','neutral'] },
    removable: { control: 'boolean' },
    removed: { action: 'removed' },
  
    label: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<TagComponent>;

export const Default: Story = { args: { label: 'Angular', variant: 'primary' } };
export const Removable: Story = { args: { label: 'TypeScript', variant: 'success', removable: true } };
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <ui-tag label="Primary" variant="primary"></ui-tag>
        <ui-tag label="Secondary" variant="secondary"></ui-tag>
        <ui-tag label="Success" variant="success"></ui-tag>
        <ui-tag label="Warning" variant="warning"></ui-tag>
        <ui-tag label="Error" variant="error"></ui-tag>
        <ui-tag label="Neutral" variant="neutral"></ui-tag>
      </div>`,
    moduleMetadata: { imports: [TagComponent] },
  }),
};