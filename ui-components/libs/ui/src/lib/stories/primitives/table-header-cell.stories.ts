// libs/ui/src/lib/stories/primitives/table-header-cell.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { TableHeaderCellComponent } from '../../primitives/table-header-cell';
import { TableComponent } from '../../primitives/table';
import { TableHeadComponent } from '../../primitives/table-head';
import { TableRowComponent } from '../../primitives/table-row';

const IMPORTS = [TableComponent, TableHeadComponent, TableRowComponent];

const meta: Meta<TableHeaderCellComponent> = {
  title: 'Primitives/TableHeaderCell',
  component: TableHeaderCellComponent,
  tags: [
    'autodocs',
    'a11y',
    'accessibility',
    'wcag',
    'keyboard-navigation',
    'screen-reader',
  ],
  argTypes: {
    scope: { control: 'select', options: ['col', 'row'] },
    align: { control: 'select', options: ['left', 'center', 'right'] },
    colspan: { control: 'number' },
    rowspan: { control: 'number' },
    sortable: { control: 'boolean' },
    sortDirection: {
      control: 'select',
      options: ['ascending', 'descending', null],
    },
    expandColumn: { control: 'boolean' },
    sortClick: { action: 'sortClick' },
  },
};
export default meta;
type Story = StoryObj<TableHeaderCellComponent>;

export const Default: Story = {
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <ui-table [bordered]="true">
        <ui-table-head>
          <ui-table-row>
            <ui-table-header-cell>Name</ui-table-header-cell>
            <ui-table-header-cell align="right">Amount</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
      </ui-table>`,
  }),
};

export const Sortable: Story = {
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <ui-table [bordered]="true">
        <ui-table-head>
          <ui-table-row>
            <ui-table-header-cell [sortable]="true" sortDirection="ascending">Date</ui-table-header-cell>
            <ui-table-header-cell [sortable]="true" sortDirection="descending">Amount</ui-table-header-cell>
            <ui-table-header-cell [sortable]="true" [sortDirection]="null">Status</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
      </ui-table>`,
  }),
};

export const ExpandColumn: Story = {
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <ui-table [bordered]="true">
        <ui-table-head>
          <ui-table-row>
            <ui-table-header-cell [expandColumn]="true"></ui-table-header-cell>
            <ui-table-header-cell>Date</ui-table-header-cell>
            <ui-table-header-cell align="right">Amount</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
      </ui-table>`,
  }),
};

export const SpannedColumn: Story = {
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <ui-table [bordered]="true">
        <ui-table-head>
          <ui-table-row>
            <ui-table-header-cell>Name</ui-table-header-cell>
            <ui-table-header-cell [colspan]="2" align="center">Spans two columns</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
      </ui-table>`,
  }),
};