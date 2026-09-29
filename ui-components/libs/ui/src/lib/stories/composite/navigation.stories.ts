import type { Meta, StoryObj } from '@storybook/angular';
import { NavigationComponent, UiNavItem } from '../../composite/navigation';

const ITEMS: UiNavItem[] = [
  { id: 'home', label: 'Home', href: '#', current: true },
  { id: 'accounts', label: 'Accounts', href: '#' },
  {
    id: 'reports',
    label: 'Reports',
    children: [
      { id: 'monthly', label: 'Monthly Statement', href: '#' },
      { id: 'audit', label: 'Audit Trail', href: '#' },
      { id: 'settlement', label: 'Settlement', href: '#' },
    ],
  },
  { id: 'support', label: 'Support', href: '#' },
];

const meta: Meta<NavigationComponent> = {
  title: 'Composite/Navigation',
  component: NavigationComponent,
  tags: ['autodocs', 'a11y', 'keyboard-navigation'],
  argTypes: {
    large: { control: 'boolean' },
    inverse: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-navigation [items]="items" [large]="large" [inverse]="inverse">
        <strong slot="brand">American Express</strong>
      </ui-navigation>`,
  }),
};
export default meta;
type Story = StoryObj<NavigationComponent>;

export const Default: Story = { args: { items: ITEMS } };
export const Large: Story = { args: { items: ITEMS, large: true } };
export const Inverse: Story = {
  args: { items: ITEMS, inverse: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="background:#00175a;">
        <ui-navigation [items]="items" [inverse]="inverse">
          <strong slot="brand" style="color:#fff;">American Express</strong>
        </ui-navigation>
      </div>`,
  }),
};