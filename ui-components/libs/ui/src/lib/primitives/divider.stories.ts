import type { Meta, StoryObj } from '@storybook/angular';
import { DividerComponent } from './divider';

const meta: Meta<DividerComponent> = {
  title: 'Primitives/Divider',
  component: DividerComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    label: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<DividerComponent>;

export const Horizontal: Story = { args: { orientation: 'horizontal' } };
export const WithLabel: Story = { args: { orientation: 'horizontal', label: 'OR' } };
export const Vertical: Story = {
  render: () => ({
    template: `<div style="display:flex;height:40px;align-items:center;gap:12px"><span>Left</span><ui-divider orientation="vertical"></ui-divider><span>Right</span></div>`,
    moduleMetadata: { imports: [DividerComponent] },
  }),
};