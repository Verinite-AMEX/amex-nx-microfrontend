import type { Meta, StoryObj } from '@storybook/angular';
import { PanelComponent } from './panel';

const meta: Meta<PanelComponent> = {
  title: 'Composite/Panel',
  component: PanelComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader'],
  argTypes: {
    title: { control: 'text' },
    variant: { control: 'select', options: ['accent', 'band'] },
  },
};
export default meta;
type Story = StoryObj<PanelComponent>;

/** OMS-style panel — title + purple accent rule + bordered box. */
export const Accent: Story = {
  args: { title: 'Merchant Details', variant: 'accent' },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width:480px">
        <ui-panel [title]="title" [variant]="variant">
          Panel body content goes here — forms, tables, or any projected markup.
        </ui-panel>
      </div>`,
  }),
};

/** BTA-style panel — light-blue title band flush against a bordered box. */
export const Band: Story = {
  args: { title: 'BCRB REPORTS MAIN', variant: 'band' },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width:480px">
        <ui-panel [title]="title" [variant]="variant">
          Panel body content goes here — forms, tables, or any projected markup.
        </ui-panel>
      </div>`,
  }),
};

/** No title — accent variant renders just the bordered content box. */
export const NoTitle: Story = {
  args: { variant: 'accent' },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width:480px">
        <ui-panel [variant]="variant">
          Untitled panel — no accent rule, no band.
        </ui-panel>
      </div>`,
  }),
};