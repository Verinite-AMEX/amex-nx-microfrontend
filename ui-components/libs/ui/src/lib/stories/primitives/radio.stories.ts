import type { Meta, StoryObj } from '@storybook/angular';
import { RadioComponent } from '../../primitives/radio';

const meta: Meta<RadioComponent> = {
  title: 'Primitives/Radio',
  component: RadioComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'form-validation', 'screen-reader', 'keyboard-navigation'],
  argTypes: {
    name: { control: 'text' },
    value: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    label: { control: 'text' },
    ariaLabel: { control: 'text' },
    ariaDescribedBy: { control: 'text' },
    ariaInvalid: { control: 'boolean' },
    checkedChange: { action: 'checkedChange' },
  },
};
export default meta;
type Story = StoryObj<RadioComponent>;

export const Unchecked: Story = {
  args: { name: 'demo', value: 'a', label: 'Option A' },
};

export const Checked: Story = {
  args: { name: 'demo', value: 'a', label: 'Option A', checked: true },
};

export const Disabled: Story = {
  args: { name: 'demo', value: 'a', label: 'Disabled option', disabled: true },
};

/** Note: for a full group with roving tabindex and a shared `name`, use RadioGroup instead. */
export const StandaloneGroup: Story = {
  name: 'Two standalone radios sharing a name',
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:8px">
        <ui-radio name="plan" value="basic" label="Basic" [checked]="true"></ui-radio>
        <ui-radio name="plan" value="pro" label="Pro"></ui-radio>
      </div>`,
  }),
};