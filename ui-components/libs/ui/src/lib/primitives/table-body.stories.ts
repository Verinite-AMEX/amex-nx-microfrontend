import type { Meta, StoryObj } from '@storybook/angular';
import { TableBodyComponent } from './table-body';
import { TableComponent } from './table';
import { TableRowComponent } from './table-row';
import { TableCellComponent } from './table-cell';

const IMPORTS = [TableComponent, TableRowComponent, TableCellComponent];

const meta: Meta<TableBodyComponent> = {
  title: 'Primitives/TableBody',
  component: TableBodyComponent,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;
type Story = StoryObj<TableBodyComponent>;

export const Default: Story = {
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <ui-table [bordered]="true" [striped]="true">
        <ui-table-body>
          <ui-table-row>
            <ui-table-cell>John Smith</ui-table-cell>
            <ui-table-cell>Active</ui-table-cell>
          </ui-table-row>
          <ui-table-row>
            <ui-table-cell>Jane Doe</ui-table-cell>
            <ui-table-cell>Active</ui-table-cell>
          </ui-table-row>
          <ui-table-row>
            <ui-table-cell>Mark Wilson</ui-table-cell>
            <ui-table-cell>Inactive</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>`,
  }),
};