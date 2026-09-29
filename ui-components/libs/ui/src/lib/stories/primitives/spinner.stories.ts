// libs/ui/src/lib/stories/primitives/spinner.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { SpinnerComponent } from '../../primitives/spinner';

const meta: Meta<SpinnerComponent> = {
  title: 'Primitives/Spinner',
  component: SpinnerComponent,
  tags: [
    'autodocs',
    'a11y',
    'accessibility',
    'wcag',
    'screen-reader',
    'color-contrast',
  ],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'default', 'lg'] },
    value: { control: { type: 'range', min: 0, max: 100 } },
    indeterminate: { control: 'boolean' },
    showValue: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<SpinnerComponent>;

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Determinate: Story = {
  args: { indeterminate: false, value: 50, showValue: true },
};

export const Large: Story = {
  args: { indeterminate: true, size: 'lg' },
};

export const Small: Story = {
  args: { indeterminate: true, size: 'sm' },
};

export const Sizes: Story = {
  render: () => ({
    template: `<div style="display:flex;gap:16px;align-items:center">
      <ui-spinner size="sm"></ui-spinner>
      <ui-spinner size="default"></ui-spinner>
      <ui-spinner size="lg"></ui-spinner>
    </div>`,
    moduleMetadata: { imports: [SpinnerComponent] },
  }),
};