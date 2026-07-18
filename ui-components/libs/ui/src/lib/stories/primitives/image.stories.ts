import type { Meta, StoryObj } from '@storybook/angular';
import { ImageComponent } from '../../primitives/image';

const meta: Meta<ImageComponent> = {
  title: 'Primitives/Image',
  component: ImageComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    objectFit: { control: 'select', options: ['cover', 'contain', 'fill'] },
    loading: { control: 'select', options: ['eager', 'lazy'] },
    fallbackText: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<ImageComponent>;

export const Default: Story = {
  args: { src: 'https://placehold.co/320x180', alt: 'Placeholder image' },
  render: (args) => ({
    props: args,
    template: `<div style="width:320px;height:180px"><ui-image [src]="src" [alt]="alt" [objectFit]="objectFit" [loading]="loading"></ui-image></div>`,
  }),
};

export const Contain: Story = {
  args: { src: 'https://placehold.co/600x200', alt: 'Wide placeholder', objectFit: 'contain' },
  render: (args) => ({
    props: args,
    template: `<div style="width:320px;height:180px;background:#eee"><ui-image [src]="src" [alt]="alt" [objectFit]="objectFit"></ui-image></div>`,
  }),
};

export const Fallback: Story = {
  name: 'No src — fallback shown',
  args: { fallbackText: 'AMERICAN EXPRESS', alt: 'Card art unavailable' },
  render: (args) => ({
    props: args,
    template: `<div style="width:320px;height:180px"><ui-image [src]="src" [alt]="alt" [fallbackText]="fallbackText"></ui-image></div>`,
  }),
};