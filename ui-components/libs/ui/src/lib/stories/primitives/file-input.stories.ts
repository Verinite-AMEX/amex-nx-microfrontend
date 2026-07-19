import type { Meta, StoryObj } from '@storybook/angular';
import { FileInputComponent } from '../../primitives/file-input';

const meta: Meta<FileInputComponent> = {
  title: 'Primitives/FileInput',
  component: FileInputComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'form-validation', 'screen-reader', 'keyboard-navigation'],
  argTypes: {
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    ariaDescribedBy: { control: 'text' },
    filesSelected: { action: 'filesSelected' },
  },
};
export default meta;
type Story = StoryObj<FileInputComponent>;

export const Default: Story = {
  args: { ariaLabel: 'Choose a file' },
};

export const ImagesOnly: Story = {
  args: { accept: 'image/*', ariaLabel: 'Choose an image' },
};

export const Multiple: Story = {
  args: { multiple: true, ariaLabel: 'Choose one or more files' },
};

export const Disabled: Story = {
  args: { disabled: true, ariaLabel: 'Choose a file' },
};