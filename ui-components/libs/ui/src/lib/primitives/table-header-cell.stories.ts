import type { Meta, StoryObj } from '@storybook/angular';
import { TableHeaderCellComponent } from './table-header-cell';
import { TableComponent } from './table';
import { TableHeadComponent } from './table-head';
import { TableRowComponent } from './table-row';

const IMPORTS = [TableComponent, TableHeadComponent, TableRowComponent];

const meta: Meta<TableHeaderCellComponent> = {
  title: 'Primitives/TableHeaderCell',
  component: TableHeaderCellComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'keyboard-navigation', 'screen-reader'],
  argTypes: {
    scope: { control: 'select', options: ['col', 'row'] },
    align: { control: 'select', options: ['left', 'center', 'right'] },
    colspan: { control: 'number' },
    rowspan: { control: 'number' },
    width: { control: 'text' },
    sortable: { control: 'boolean' },
    sortDirection: { control: 'select', options: ['asc', 'desc', null] },
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
          <ui-table-row [header]="true">
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
          <ui-table-row [header]="true">
            <ui-table-header-cell [sortable]="true" sortDirection="asc">Date</ui-table-header-cell>
            <ui-table-header-cell [sortable]="true" sortDirection="desc">Amount</ui-table-header-cell>
            <ui-table-header-cell [sortable]="true" [sortDirection]="null">Status</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
      </ui-table>`,
  }),
};

export const FixedWidthAndSpan: Story = {
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <ui-table [bordered]="true">
        <ui-table-head>
          <ui-table-row [header]="true">
            <ui-table-header-cell width="200px">Fixed 200px column</ui-table-header-cell>
            <ui-table-header-cell [colspan]="2" align="center">Spans two columns</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
      </ui-table>`,
  }),
};