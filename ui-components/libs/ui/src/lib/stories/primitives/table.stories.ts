// libs/ui/src/lib/stories/primitives/table.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { TableComponent } from '../../primitives/table';
import { TableHeadComponent } from '../../primitives/table-head';
import { TableBodyComponent } from '../../primitives/table-body';
import { TableFootComponent } from '../../primitives/table-foot';
import { TableRowComponent } from '../../primitives/table-row';
import { TableHeaderCellComponent } from '../../primitives/table-header-cell';
import { TableCellComponent } from '../../primitives/table-cell';
import {
  StorySortableTableComponent,
  StoryCheckableTableComponent,
  StoryExpandableTableComponent,
} from './table-story-helpers';

const TABLE_IMPORTS = [
  TableHeadComponent,
  TableBodyComponent,
  TableFootComponent,
  TableRowComponent,
  TableHeaderCellComponent,
  TableCellComponent,
];

const meta: Meta<TableComponent> = {
  title: 'Primitives/Table',
  component: TableComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader'],
  argTypes: {
    caption: { control: 'text' },
    bordered: { control: 'boolean' },
    striped: { control: 'boolean' },
    compact: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    ariaLabelledBy: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<TableComponent>;

// ---- Basic variants (Default/Hover, Striped, Bordered, Compact) ----

const baseTemplate = (opts: string) => `
  <ui-table ${opts}>
    <ui-table-head>
      <ui-table-row>
        <ui-table-header-cell>Date</ui-table-header-cell>
        <ui-table-header-cell>Description</ui-table-header-cell>
        <ui-table-header-cell align="right">Amount</ui-table-header-cell>
      </ui-table-row>
    </ui-table-head>
    <ui-table-body>
      <ui-table-row>
        <ui-table-cell>Jan 05, 2020</ui-table-cell>
        <ui-table-cell>SAINSBURY'S ONLINE-GOL LON</ui-table-cell>
        <ui-table-cell align="right">$8.76</ui-table-cell>
      </ui-table-row>
      <ui-table-row>
        <ui-table-cell>Mar 16, 2020</ui-table-cell>
        <ui-table-cell>Online Payment</ui-table-cell>
        <ui-table-cell align="right">-$300.00</ui-table-cell>
      </ui-table-row>
      <ui-table-row>
        <ui-table-cell>Oct 01, 2020</ui-table-cell>
        <ui-table-cell>Music Enterprise In</ui-table-cell>
        <ui-table-cell align="right">$10.67</ui-table-cell>
      </ui-table-row>
    </ui-table-body>
  </ui-table>`;

export const Default: Story = {
  name: 'Default (Hover)',
  render: () => ({
    moduleMetadata: { imports: TABLE_IMPORTS },
    template: baseTemplate('[hoverable]="true"'),
  }),
};

export const Striped: Story = {
  render: () => ({
    moduleMetadata: { imports: TABLE_IMPORTS },
    template: baseTemplate('[striped]="true"'),
  }),
};

export const Bordered: Story = {
  render: () => ({
    moduleMetadata: { imports: TABLE_IMPORTS },
    template: baseTemplate('[bordered]="true"'),
  }),
};

export const Compact: Story = {
  render: () => ({
    moduleMetadata: { imports: TABLE_IMPORTS },
    template: baseTemplate('[compact]="true"'),
  }),
};

export const WithCaptionAndFooter: Story = {
  render: () => ({
    moduleMetadata: { imports: TABLE_IMPORTS },
    template: `
      <ui-table caption="User accounts as of 25 Mar 2024" [bordered]="true">
        <ui-table-head>
          <ui-table-row>
            <ui-table-header-cell>Name</ui-table-header-cell>
            <ui-table-header-cell align="right">Balance</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
        <ui-table-body>
          <ui-table-row>
            <ui-table-cell>John Smith</ui-table-cell>
            <ui-table-cell align="right">AED 1,250.00</ui-table-cell>
          </ui-table-row>
          <ui-table-row>
            <ui-table-cell>Jane Doe</ui-table-cell>
            <ui-table-cell align="right">AED 3,400.50</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
        <ui-table-foot>
          <ui-table-row>
            <ui-table-cell>Total</ui-table-cell>
            <ui-table-cell align="right">AED 4,650.50</ui-table-cell>
          </ui-table-row>
        </ui-table-foot>
      </ui-table>`,
  }),
};

export const Sortable: Story = {
  render: () => ({
    moduleMetadata: { imports: [StorySortableTableComponent] },
    template: `<story-sortable-table></story-sortable-table>`,
  }),
};

export const Checkable: Story = {
  render: () => ({
    moduleMetadata: { imports: [StoryCheckableTableComponent] },
    template: `<story-checkable-table></story-checkable-table>`,
  }),
};

export const Expandable: Story = {
  render: () => ({
    moduleMetadata: { imports: [StoryExpandableTableComponent] },
    template: `<story-expandable-table></story-expandable-table>`,
  }),
};