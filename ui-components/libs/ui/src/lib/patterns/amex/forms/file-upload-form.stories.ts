import type { Meta, StoryObj } from '@storybook/angular';
import { AmexFileUploadFormComponent } from './file-upload-form';
const meta: Meta<AmexFileUploadFormComponent> = { title: 'Patterns/Amex/Forms/FileUploadForm', component: AmexFileUploadFormComponent, tags: ['autodocs'],
  argTypes: {
    fileLabel: { control: 'object' },
    submitLabel: { control: 'object' },
    errorMessage: { control: 'object' },
  },
};
export default meta;
type Story = StoryObj<AmexFileUploadFormComponent>;
export const CenturionTxt: Story = { name: 'Centurion Living — Load Client Data (.txt)', args: { title: 'Load Client Data', hintText: 'Please upload only .txt file', acceptedTypes: '.txt' } };
export const BCRBCsv: Story = { name: 'BCRB — Upload CSV report', args: { title: 'Upload BCRB Report', hintText: 'Please upload a .csv file', acceptedTypes: '.csv' } };
export const SOCExcel: Story = { name: 'SOC/ROC — Upload Excel file', args: { title: 'Upload SOC/ROC Data', hintText: 'Please upload an .xlsx file', acceptedTypes: '.xlsx' } };