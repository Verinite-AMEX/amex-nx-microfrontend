import type { Meta, StoryObj } from '@storybook/angular';
import { BreadcrumbComponent } from '../../primitives/breadcrumb';

const meta: Meta<BreadcrumbComponent> = {
  title: 'Primitives/Breadcrumb',
  component: BreadcrumbComponent,
  tags: [
    'autodocs',
    'a11y',
    'accessibility',
    'wcag',
    'screen-reader',
    'keyboard-navigation',
  ],
  argTypes: {
    interactive: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<BreadcrumbComponent>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Library', href: '/library' },
      { label: 'Data' },
    ],
  },
};

export const SingleCrumb: Story = {
  args: {
    items: [{ label: 'Home' }],
  },
};

export const LongBreadcrumbMobile: Story = {
  parameters: {
    layout: 'padded',
  },
  args: {
    items: [
      { label: 'Breadcrumb 1', href: '/1' },
      { label: 'Breadcrumb 2', href: '/2' },
      { label: 'Breadcrumb 3', href: '/3' },
      { label: 'Breadcrumb 4' },
    ],
  },
  decorators: [
    (story) => ({
      ...story(),
      template: `<div style="max-width: 400px;">${
        story().template ?? ''
      }</div>`,
    }),
  ],
};

export const NonInteractive: Story = {
  args: {
    interactive: false,
    items: [
      { label: 'Home', href: '/' },
      { label: 'Library', href: '/library' },
      { label: 'Data' },
    ],
  },
};