import type { Meta, StoryObj } from '@storybook/angular';
import { AccentCardComponent } from '../../../composite/amex/accent-card';

const meta: Meta<AccentCardComponent> = {
  title: 'Composite/amex/AccentCard',
  component: AccentCardComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader', 'color-contrast'],
  argTypes: {
    accentColor: { control: 'color' },
    accentHeight: { control: 'number' },
    background: { control: 'color' },
    padding: { control: 'text' },
    width: { control: 'text' },
    maxWidth: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<AccentCardComponent>;

export const Default: Story = {
  args: {
    accentColor: '#7b1f4b',
    accentHeight: 4,
    maxWidth: '360px',
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-accent-card
        [accentColor]="accentColor"
        [accentHeight]="accentHeight"
        [background]="background"
        [padding]="padding"
        [width]="width"
        [maxWidth]="maxWidth"
        style="display:block">
        <p style="margin:0;font-size:14px;color:#333">Card body content goes here.</p>
      </ui-accent-card>`,
  }),
};

export const CustomAccentColor: Story = {
  args: {
    accentColor: '#016fd0',
    accentHeight: 4,
    maxWidth: '360px',
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-accent-card [accentColor]="accentColor" [accentHeight]="accentHeight" [maxWidth]="maxWidth" style="display:block">
        <p style="margin:0;font-size:14px;color:#333">Accent color is fully consumer-configurable.</p>
      </ui-accent-card>`,
  }),
};

export const ThickerAccentBar: Story = {
  args: {
    accentColor: '#7b1f4b',
    accentHeight: 10,
    maxWidth: '360px',
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-accent-card [accentColor]="accentColor" [accentHeight]="accentHeight" [maxWidth]="maxWidth" style="display:block">
        <p style="margin:0;font-size:14px;color:#333">Accent bar thickness is configurable too.</p>
      </ui-accent-card>`,
  }),
};

export const CustomSize: Story = {
  args: {
    accentColor: '#7b1f4b',
    accentHeight: 4,
    width: '100%',
    maxWidth: '500px',
    padding: '32px',
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-accent-card
        [accentColor]="accentColor"
        [accentHeight]="accentHeight"
        [width]="width"
        [maxWidth]="maxWidth"
        [padding]="padding"
        style="display:block">
        <p style="margin:0;font-size:14px;color:#333">A wider card with more inner padding — size is fully in the consumer's control.</p>
      </ui-accent-card>`,
  }),
};