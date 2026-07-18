import type { Meta, StoryObj } from '@storybook/angular';
import { ListComponent } from './list';
import { ListItemComponent } from './list-item';

const meta: Meta<ListComponent> = {
  title: 'Primitives/List',
  component: ListComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader'],
  argTypes: {
    ordered: { control: 'boolean' },
    unstyled: { control: 'boolean' },
    compact: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<ListComponent>;

export const Bulleted: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ListItemComponent] },
    template: `
      <ui-list [ordered]="ordered" [compact]="compact" [unstyled]="unstyled" [ariaLabel]="ariaLabel">
        <ui-list-item>First item</ui-list-item>
        <ui-list-item>Second item</ui-list-item>
        <ui-list-item>Third item</ui-list-item>
      </ui-list>`,
  }),
};

export const Numbered: Story = {
  args: { ordered: true },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ListItemComponent] },
    template: `
      <ui-list [ordered]="ordered">
        <ui-list-item>Step one — enter your details</ui-list-item>
        <ui-list-item>Step two — confirm your email</ui-list-item>
        <ui-list-item>Step three — set a password</ui-list-item>
      </ui-list>`,
  }),
};

export const Unstyled: Story = {
  args: { unstyled: true },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ListItemComponent] },
    template: `
      <ui-list [unstyled]="unstyled">
        <ui-list-item>No bullet, card-row style</ui-list-item>
        <ui-list-item>Second row</ui-list-item>
      </ui-list>`,
  }),
};

export const ClickableItems: Story = {
  name: 'List with clickable items',
  render: () => ({
    moduleMetadata: { imports: [ListItemComponent] },
    template: `
      <ui-list [unstyled]="true">
        <ui-list-item [clickable]="true" (itemClick)="onClick('Settings')">Settings</ui-list-item>
        <ui-list-item [clickable]="true" (itemClick)="onClick('Profile')">Profile</ui-list-item>
        <ui-list-item [clickable]="true" (itemClick)="onClick('Sign out')">Sign out</ui-list-item>
      </ui-list>`,
    props: {
      onClick: (label: string) => console.log('clicked', label),
    },
  }),
};