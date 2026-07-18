import type { Meta, StoryObj } from '@storybook/angular';
import { ListItemComponent } from './list-item';
import { ListComponent } from './list';

const meta: Meta<ListItemComponent> = {
  title: 'Primitives/ListItem',
  component: ListItemComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'keyboard-navigation', 'screen-reader'],
  argTypes: {
    clickable: { control: 'boolean' },
    itemClick: { action: 'itemClick' },
  },
};
export default meta;
type Story = StoryObj<ListItemComponent>;

export const Default: Story = {
  render: () => ({
    moduleMetadata: { imports: [ListComponent] },
    template: `<ui-list><ui-list-item>A plain list item</ui-list-item></ui-list>`,
  }),
};

export const Clickable: Story = {
  args: { clickable: true },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ListComponent] },
    template: `<ui-list [unstyled]="true"><ui-list-item [clickable]="clickable">Click or press Enter</ui-list-item></ui-list>`,
  }),
};