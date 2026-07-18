import type { Meta, StoryObj } from '@storybook/angular';
import { AmexReferenceIdComponent } from './reference-id';

const meta: Meta<AmexReferenceIdComponent> = {
  title: 'Composite/Amex/CurrencyLogic/ReferenceId',
  component: AmexReferenceIdComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader', 'color-contrast'],
  argTypes: {
    id:     { control: 'text' },
    prefix: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<AmexReferenceIdComponent>;

export const WithPrefix: Story    = { args: { id: 'REQ-20240312-00192', prefix: 'REQ' } };
export const SOC: Story           = { args: { id: 'SOC-00458721', prefix: 'SOC' } };
export const ROC: Story           = { args: { id: 'ROC-00123456', prefix: 'ROC' } };
export const NoPrefix: Story      = { args: { id: '20240312-00192', prefix: '' } };