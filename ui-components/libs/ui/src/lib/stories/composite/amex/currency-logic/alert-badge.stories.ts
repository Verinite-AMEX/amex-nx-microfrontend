import type { Meta, StoryObj } from '@storybook/angular';
import { AlertBadgeComponent } from '../../../../composite/amex/currency-logic/alert-badge';

const meta: Meta<AlertBadgeComponent> = {
  title: 'Composite/Amex/CurrencyLogic/AlertBadge',
  component: AlertBadgeComponent,
  tags: ['autodocs', 'a11y'],
  // Explicit defaults for every input, matching the component's own class
  // defaults exactly. Without this, an unset arg (e.g. color) still gets
  // bound via [style.backgroundColor]="color" as `undefined`, which strips
  // the inline style and lets DLS's .badge (blue) win the cascade over
  // .badgeIconDefault (green) — same "unset arg overrides real default"
  // gotcha we hit with AccentCard's width earlier.
  args: {
    show: true,
    count: '',
    color: '#008767',
    ariaLabel: 'New alert',
  },
  argTypes: {
    show: { control: 'boolean' },
    count: { control: 'text' },
    color: { control: 'color' },
    ariaLabel: { control: 'text' },
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-alert-badge [show]="show" [count]="count" [color]="color" [ariaLabel]="ariaLabel">
        <span style="display:inline-flex;width:32px;height:32px;border-radius:50%;background:#ecedee;align-items:center;justify-content:center;">🔔</span>
      </ui-alert-badge>
    `,
  }),
};
export default meta;
type Story = StoryObj<AlertBadgeComponent>;

export const Default: Story = { args: { show: true } };
export const WithCount: Story = { args: { show: true, count: '3' } };
export const CustomColor: Story = {
  args: { show: true, color: '#b42c01', ariaLabel: 'Urgent alert' },
};
export const Hidden: Story = { args: { show: false } };