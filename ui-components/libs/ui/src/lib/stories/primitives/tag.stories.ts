import type { Meta, StoryObj } from '@storybook/angular';
import { TagComponent } from '../../primitives/tag';

const meta: Meta<TagComponent> = {
  title: 'Primitives/Tag',
  component: TagComponent,
  tags: [
    'autodocs',
    'a11y',
    'accessibility',
    'wcag',
    'keyboard-navigation',
    'screen-reader',
  ],
  argTypes: {
    // `variant` (6 pastel colors) removed — no DLS equivalent. Replaced
    // with `style`, DLS's real two tag styles (see tag.ts for why).
    style: { control: 'radio', options: ['inline', 'general'] },
    removable: { control: 'boolean' },
    removed: { action: 'removed' },
    label: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<TagComponent>;

export const Inline: Story = {
  args: { label: 'Angular', style: 'inline' },
};
export const General: Story = {
  args: { label: 'TypeScript', style: 'general' },
};
export const RemovableInline: Story = {
  args: { label: 'Angular', style: 'inline', removable: true },
};
export const RemovableGeneral: Story = {
  args: { label: 'TypeScript', style: 'general', removable: true },
};
export const AllStyles: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <ui-tag label="Inline" style="inline"></ui-tag>
        <ui-tag label="General" style="general"></ui-tag>
        <ui-tag label="Inline, removable" style="inline" [removable]="true"></ui-tag>
        <ui-tag label="General, removable" style="general" [removable]="true"></ui-tag>
      </div>`,
    moduleMetadata: { imports: [TagComponent] },
  }),
};