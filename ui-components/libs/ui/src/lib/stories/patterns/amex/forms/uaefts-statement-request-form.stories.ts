import type { Meta, StoryObj } from '@storybook/angular';
import { AmexUAEFTSStatementRequestFormComponent } from '../../../../patterns/amex/forms/uaefts-statement-request-form';
const meta: Meta<AmexUAEFTSStatementRequestFormComponent> = { title: 'Patterns/Amex/Forms/UAEFTSStatementRequestForm', component: AmexUAEFTSStatementRequestFormComponent, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<AmexUAEFTSStatementRequestFormComponent>;
export const RequestForm: Story = { name: 'Request Bank Statement form', args: { successData: null } };
export const SuccessState: Story = { name: 'Successful Request popup (image4)', args: { successData: { referenceNumber: 'SFE250526134510' } } };
