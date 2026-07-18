import type { Meta, StoryObj } from '@storybook/angular';
import { AmexWearableIssuanceFormComponent } from '../../../../patterns/amex/forms/wearable-issuance-form';
const meta: Meta<AmexWearableIssuanceFormComponent> = { title: 'Patterns/Amex/Forms/WearableIssuanceForm', component: AmexWearableIssuanceFormComponent, tags: ['autodocs'],
  argTypes: {
    previewImageUrl: { control: 'object' },
  },
};
export default meta;
type Story = StoryObj<AmexWearableIssuanceFormComponent>;
export const Empty: Story = { name: 'No selection yet', args: { form: { clientCode: '20510406', selectedCard: 'The American Express Gold Credit Card - Card Ending 7018', wearableType: '', colorSelected: '', wearableName: '', tcAccepted: false } } };
export const Selected: Story = { name: 'Bracelet selected (image9)', args: { form: { clientCode: '20510406', selectedCard: 'The American Express Gold Credit Card - Card Ending 7018', wearableType: 'Leather Bracelet', colorSelected: '#8B4513', wearableName: 'QARR', tcAccepted: true } } };