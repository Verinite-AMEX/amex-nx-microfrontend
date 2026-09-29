import type { Meta, StoryObj } from '@storybook/angular';
import { TextLinkComponent } from '../../primitives/text-link';

const meta: Meta<TextLinkComponent> = {
  title: 'Primitives/TextLink',
  component: TextLinkComponent,
  tags: ['autodocs', 'a11y'],
  argTypes: {
    href: { control: 'text' },
    variant: { control: 'select', options: ['default', 'underlined', 'white'] },
    largeTapTarget: { control: 'boolean' },
    external: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `<ui-text-link [href]="href" [variant]="variant" [largeTapTarget]="largeTapTarget" [external]="external" [disabled]="disabled">Learn more</ui-text-link>`,
  }),
};
export default meta;
type Story = StoryObj<TextLinkComponent>;

export const Default: Story = { args: { href: '#' } };
export const Underlined: Story = { args: { href: '#', variant: 'underlined' } };
export const LargeTapTarget: Story = { args: { href: '#', largeTapTarget: true } };
export const External: Story = { args: { href: 'https://example.com', external: true } };
export const Disabled: Story = { args: { href: '#', disabled: true } };
export const OnDarkBackground: Story = {
  args: { href: '#', variant: 'white' },
  render: (args) => ({
    props: args,
    template: `<div style="background:#00175a;padding:20px;"><ui-text-link [href]="href" [variant]="variant">Learn more</ui-text-link></div>`,
  }),
};