import type { Meta, StoryObj } from '@storybook/angular';
import { TabsComponent } from '../../composite/tabs';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'disabled', label: 'Disabled', disabled: true },
];

const meta: Meta<TabsComponent> = {
  title: 'Composite/Tabs',
  component: TabsComponent,
  argTypes: {
    tabs: { control: 'object' },
    activeTab: { control: 'text' },
    ariaLabel: { control: 'text' },
  },
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'keyboard-navigation', 'screen-reader', 'roving-tabindex'],
};
export default meta;
type Story = StoryObj<TabsComponent>;

export const Default: Story = {
  args: { tabs: TABS, activeTab: 'overview' },
  render: (args) => ({
    props: args,
    template: `<ui-tabs [tabs]="tabs" [activeTab]="activeTab">Tab content goes here.</ui-tabs>`,
  }),
};