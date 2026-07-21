import type { Meta, StoryObj } from '@storybook/angular';
import { FileUploadComponent } from '../../composite/file-upload';

const meta: Meta<FileUploadComponent> = {
  title: 'Composite/FileUpload',
  component: FileUploadComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'form-validation', 'screen-reader', 'keyboard-navigation'],
  argTypes: {
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    accept: { control: 'text' },
    hint: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<FileUploadComponent>;

export const Default: Story = { args: { hint: 'PNG, JPG, PDF up to 10MB' } };
export const MultipleFiles: Story = { args: { multiple: true, hint: 'Select multiple files' } };
export const ImagesOnly: Story = { args: { accept: 'image/*', hint: 'Images only' } };
export const Disabled: Story = { args: { disabled: true } };