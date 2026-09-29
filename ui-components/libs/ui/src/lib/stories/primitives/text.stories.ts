import type { Meta, StoryObj } from '@storybook/angular';
import { TextComponent } from '../../primitives/text';

const meta: Meta<TextComponent> = {
  title: 'Primitives/Text',
  component: TextComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'heading1', 'heading2', 'heading3', 'heading4', 'heading5', 'heading6',
        'body1', 'body2', 'body3', 'label1', 'label2',
      ],
    },
    tag: {
      control: 'select',
      options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    align: { control: 'select', options: ['', 'left', 'center', 'right', 'justify'] },
    transform: { control: 'select', options: ['none', 'uppercase', 'lowercase', 'capitalize'] },
    truncate: { control: 'boolean' },
    nowrap: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `<ui-text [variant]="variant" [tag]="tag" [align]="align" [transform]="transform" [truncate]="truncate" [nowrap]="nowrap">The quick brown fox jumps over the lazy dog.</ui-text>`,
  }),
};
export default meta;
type Story = StoryObj<TextComponent>;

export const Body1: Story = { args: { variant: 'body1', tag: 'p' } };
export const Heading3: Story = { args: { variant: 'heading3', tag: 'h3' } };
export const Label1: Story = { args: { variant: 'label1', tag: 'span' } };
export const Centered: Story = { args: { variant: 'body1', tag: 'p', align: 'center' } };
export const Uppercase: Story = { args: { variant: 'body2', tag: 'p', transform: 'uppercase' } };
export const Truncated: Story = {
  args: { variant: 'body1', tag: 'p', truncate: true },
  render: (args) => ({
    props: args,
    template: `<div style="width:200px;"><ui-text [variant]="variant" [tag]="tag" [truncate]="truncate">This is a very long line of text that should get truncated with an ellipsis.</ui-text></div>`,
  }),
};