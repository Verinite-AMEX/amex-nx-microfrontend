import type { Meta, StoryObj } from '@storybook/angular';
import { TableFootComponent } from './table-foot';
import { TableComponent } from './table';
import { TableHeadComponent } from './table-head';
import { TableRowComponent } from './table-row';
import { TableHeaderCellComponent } from './table-header-cell';
import { TableBodyComponent } from './table-body';
import { TableCellComponent } from './table-cell';

const IMPORTS = [TableComponent, TableHeadComponent, TableRowComponent, TableHeaderCellComponent, TableBodyComponent, TableCellComponent];

const meta: Meta<TableFootComponent> = {
  title: 'Primitives/TableFoot',
  component: TableFootComponent,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;
type Story = StoryObj<TableFootComponent>;

export const Default: Story = {
  name: 'Totals row in a footer',
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <ui-table [bordered]="true">
        <ui-table-head>
          <ui-table-row [header]="true">
            <ui-table-header-cell>Merchant</ui-table-header-cell>
            <ui-table-header-cell align="right">Amount</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
        <ui-table-body>
          <ui-table-row>
            <ui-table-cell>Merchant A</ui-table-cell>
            <ui-table-cell align="right">AED 1,200.00</ui-table-cell>
          </ui-table-row>
          <ui-table-row>
            <ui-table-cell>Merchant B</ui-table-cell>
            <ui-table-cell align="right">AED 3,450.75</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
        <ui-table-foot>
          <ui-table-row>
            <ui-table-cell>Total</ui-table-cell>
            <ui-table-cell align="right">AED 4,650.75</ui-table-cell>
          </ui-table-row>
        </ui-table-foot>
      </ui-table>`,
  }),
};