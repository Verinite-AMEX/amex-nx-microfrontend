import type { Meta, StoryObj } from '@storybook/angular';
import { AmexCardBadgeComponent } from './card-badge';

const meta: Meta<AmexCardBadgeComponent> = {
  title: 'Composite/Amex/CurrencyLogic/CardBadge',
  component: AmexCardBadgeComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader', 'color-contrast'],
  argTypes: {
    type: { control: 'select', options: ['centurion','platinum','gold','green','corporate','bta','supplementary'] },
    label: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<AmexCardBadgeComponent>;

export const Centurion: Story = { args: { type: 'centurion' } };
export const Platinum: Story  = { args: { type: 'platinum' } };
export const Gold: Story      = { args: { type: 'gold' } };
export const Green: Story     = { args: { type: 'green' } };
export const Corporate: Story = { args: { type: 'corporate' } };
export const BTA: Story       = { args: { type: 'bta' } };
export const Supplementary: Story = { args: { type: 'supplementary' } };
export const CustomLabel: Story   = { args: { type: 'platinum', label: 'PLAT BUSINESS' } };