import type { Meta, StoryObj } from '@storybook/angular';
import { AmexStatementViewerComponent } from './statement-viewer';

const meta: Meta<AmexStatementViewerComponent> = {
  title: 'Patterns/Amex/DisplayViewers/StatementViewer',
  component: AmexStatementViewerComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexStatementViewerComponent>;

export const Empty: Story = {
  name: 'Empty — awaiting card number',
  args: { cardNumber: '', statements: [] },
};

export const WithResults: Story = {
  name: 'With statement months (after submit)',
  args: {
    cardNumber: '374405679097005',
    statements: [
      { label: 'October 2029', isLatest: true },
      { label: 'September 2029' },
      { label: 'August 2029' },
      { label: 'July 2029' },
      { label: 'June 2029' },
      { label: 'May 2029' },
      { label: 'April 2029' },
      { label: 'March 2029' },
      { label: 'February 2029' },
      { label: 'January 2029' },
      { label: 'December 2028' },
      { label: 'November 2028' },
    ],
  },
};
