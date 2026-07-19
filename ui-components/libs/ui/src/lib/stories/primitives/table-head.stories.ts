import type { Meta, StoryObj } from '@storybook/angular';
import { TableHeadComponent } from '../../primitives/table-head';
import { TableComponent } from '../../primitives/table';
import { TableRowComponent } from '../../primitives/table-row';
import { TableHeaderCellComponent } from '../../primitives/table-header-cell';
import { TableBodyComponent } from '../../primitives/table-body';
import { TableCellComponent } from '../../primitives/table-cell';

const IMPORTS = [TableComponent, TableRowComponent, TableHeaderCellComponent, TableBodyComponent, TableCellComponent];

const meta: Meta<TableHeadComponent> = {
  title: 'Primitives/TableHead',
  component: TableHeadComponent,
  tags: ['autodocs'],
  argTypes: {
    sticky: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<TableHeadComponent>;

export const Default: Story = {
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <ui-table [bordered]="true">
        <ui-table-head>
          <ui-table-row [header]="true">
            <ui-table-header-cell>Date</ui-table-header-cell>
            <ui-table-header-cell>Description</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
        <ui-table-body>
          <ui-table-row>
            <ui-table-cell>12 Mar 2024</ui-table-cell>
            <ui-table-cell>Amazon AE</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>`,
  }),
};

export const Sticky: Story = {
  name: 'Sticky (for scrollable tables)',
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <div style="max-height:140px;overflow-y:auto;border:1px solid #e0e0e0">
        <ui-table [bordered]="true">
          <ui-table-head [sticky]="true">
            <ui-table-row [header]="true">
              <ui-table-header-cell>Date</ui-table-header-cell>
              <ui-table-header-cell>Description</ui-table-header-cell>
            </ui-table-row>
          </ui-table-head>
          <ui-table-body>
            <ui-table-row><ui-table-cell>12 Mar</ui-table-cell><ui-table-cell>Amazon AE</ui-table-cell></ui-table-row>
            <ui-table-row><ui-table-cell>11 Mar</ui-table-cell><ui-table-cell>Carrefour</ui-table-cell></ui-table-row>
            <ui-table-row><ui-table-cell>10 Mar</ui-table-cell><ui-table-cell>Emirates Airlines</ui-table-cell></ui-table-row>
            <ui-table-row><ui-table-cell>09 Mar</ui-table-cell><ui-table-cell>Noon Shopping</ui-table-cell></ui-table-row>
            <ui-table-row><ui-table-cell>08 Mar</ui-table-cell><ui-table-cell>Talabat</ui-table-cell></ui-table-row>
          </ui-table-body>
        </ui-table>
      </div>`,
  }),
};