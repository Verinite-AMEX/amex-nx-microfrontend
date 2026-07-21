import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from '../../composite/card';
import { BadgeComponent } from '../../primitives/badge';
import { ButtonComponent } from '../../primitives/button';

const meta: Meta<CardComponent> = {
  title: 'Composite/Card',
  component: CardComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader', 'color-contrast'],
  argTypes: {
    variant: { control: 'radio', options: ['elevated', 'flat'] },
    hoverable: { control: 'boolean' },
    image: { control: 'text' },
  
    subtitle: { control: 'text' },
    hasFooter: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<CardComponent>;

export const Simple: Story = {
  args: { title: 'Card Title', subtitle: 'Subtitle text' },
  render: (args) => ({
    props: args,
    template: `<ui-card [title]="title" [subtitle]="subtitle" style="max-width:320px;display:block">Some card content goes here.</ui-card>`,
  }),
};

export const Hoverable: Story = {
  args: { title: 'Hover me', hoverable: true },
  render: (args) => ({
    props: args,
    template: `<ui-card [title]="title" [hoverable]="hoverable" style="max-width:320px;display:block">Hover to see the lift effect.</ui-card>`,
  }),
};

export const WithImage: Story = {
  args: { title: 'Card Title', subtitle: 'Subtitle text', image: 'https://placehold.co/320x160' },
  render: (args) => ({
    props: args,
    template: `<ui-card [title]="title" [subtitle]="subtitle" [image]="image" style="max-width:320px;display:block">Some card content goes here.</ui-card>`,
  }),
};

export const WithFooter: Story = {
  render: () => ({
    moduleMetadata: { imports: [ButtonComponent, BadgeComponent] },
    template: `
      <ui-card title="Product Name" subtitle="Category" [hasFooter]="true" style="max-width:320px;display:block">
        <ui-badge label="In Stock" variant="success"></ui-badge>
        <p style="margin-top:8px;font-size:14px;color:#555">A great product description goes here.</p>
        <div slot="footer" style="display:flex;gap:8px">
          <ui-button label="Buy Now" variant="primary" size="sm"></ui-button>
          <ui-button label="Wishlist" variant="secondary" size="sm"></ui-button>
        </div>
      </ui-card>`,
  }),
};