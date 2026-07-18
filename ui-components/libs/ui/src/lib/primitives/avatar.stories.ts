import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarComponent } from './avatar';

const meta: Meta<AvatarComponent> = {
  title: 'Primitives/Avatar',
  component: AvatarComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader', 'color-contrast'],
  argTypes: {
    size: { control: 'radio', options: ['sm','md','lg','xl'] },
    color: { control: 'color' },
  
    src: { control: 'text' },
    alt: { control: 'text' },
    initials: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<AvatarComponent>;

export const WithInitials: Story = { args: { initials: 'JD', size: 'md', color: '#1976d2' } };
export const WithImage: Story = { args: { src: 'https://i.pravatar.cc/150?img=3', alt: 'User', size: 'md' } };
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        <ui-avatar initials="SM" size="sm"></ui-avatar>
        <ui-avatar initials="MD" size="md"></ui-avatar>
        <ui-avatar initials="LG" size="lg"></ui-avatar>
        <ui-avatar initials="XL" size="xl"></ui-avatar>
      </div>`,
    moduleMetadata: { imports: [AvatarComponent] },
  }),
};