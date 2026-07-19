import type { Meta, StoryObj } from '@storybook/angular';
import { LabelComponent } from '../../primitives/label';

const meta: Meta<LabelComponent> = {
  title: 'Primitives/Label',
  component: LabelComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'form-validation', 'screen-reader'],
  argTypes: {
    forId: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<LabelComponent>;

export const Default: Story = {
  render: () => ({
    template: `<ui-label>Username</ui-label>`,
  }),
};

export const Required: Story = {
  args: { required: true },
  render: (args) => ({
    props: args,
    template: `<ui-label [required]="required">Email address</ui-label>`,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    props: args,
    template: `<ui-label [disabled]="disabled">Read-only field</ui-label>`,
  }),
};

export const LinkedToInput: Story = {
  name: 'Linked to a form control (forId)',
  args: { forId: 'demo-username-input', required: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;flex-direction:column;gap:4px">
        <ui-label [forId]="forId" [required]="required">Username</ui-label>
        <input id="demo-username-input" type="text" style="padding:6px 8px" />
      </div>`,
  }),
};