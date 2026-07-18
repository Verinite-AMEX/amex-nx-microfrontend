import type { Meta, StoryObj } from '@storybook/angular';
import { NotificationToastComponent } from '../../composite/notification-toast';

const meta: Meta<NotificationToastComponent> = {
  title: 'Composite/NotificationToast',
  component: NotificationToastComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader', 'color-contrast'],
  argTypes: {
    variant: { control: 'select', options: ['info','success','warning','error'] },
    dismissed: { action: 'dismissed' },
  
    message: { control: 'text' },
    duration: { control: 'object' },
  },
};
export default meta;
type Story = StoryObj<NotificationToastComponent>;

export const Info: Story = { args: { variant: 'info', title: 'Update available', message: 'A new version is ready to install.', duration: 0 } };
export const Success: Story = { args: { variant: 'success', title: 'Saved!', message: 'Your changes have been saved.', duration: 0 } };
export const Warning: Story = { args: { variant: 'warning', message: 'Low disk space detected.', duration: 0 } };
export const Error: Story = { args: { variant: 'error', title: 'Upload failed', message: 'File size exceeds the 10MB limit.', duration: 0 } };