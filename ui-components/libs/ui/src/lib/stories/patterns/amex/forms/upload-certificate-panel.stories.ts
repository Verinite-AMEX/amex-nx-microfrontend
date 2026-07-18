import type { Meta, StoryObj } from '@storybook/angular';
import { AmexUploadCertificatePanelComponent } from '../../../../patterns/amex/forms/upload-certificate-panel';
const meta: Meta<AmexUploadCertificatePanelComponent> = { title: 'Patterns/Amex/Forms/UploadCertificatePanel', component: AmexUploadCertificatePanelComponent, tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    stepInfo: { control: 'text' },
    fileLabel: { control: 'text' },
    uploadLabel: { control: 'text' },
    acceptedTypes: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<AmexUploadCertificatePanelComponent>;
export const Idle: Story = { name: 'Idle — no file selected', args: { status: 'idle', hintText: 'Please upload only .pdf or .jpg files' } };
export const Success: Story = { name: 'Upload success', args: { status: 'success', statusMessage: 'Certificate uploaded successfully.' } };
export const Error: Story = { name: 'Upload error', args: { status: 'error', statusMessage: 'Invalid file type. Please upload a PDF.' } };