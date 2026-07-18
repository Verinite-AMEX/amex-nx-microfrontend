import type { Meta, StoryObj } from '@storybook/angular';
import { TableCellComponent } from './table-cell';
import { TableComponent } from './table';
import { TableBodyComponent } from './table-body';
import { TableRowComponent } from './table-row';

const IMPORTS = [TableComponent, TableBodyComponent, TableRowComponent];

const meta: Meta<TableCellComponent> = {
  title: 'Primitives/TableCell',
  component: TableCellComponent,
  tags: ['autodocs'],
  argTypes: {
    align: { control: 'select', options: ['left', 'center', 'right'] },
    verticalAlign: { control: 'select', options: ['top', 'middle', 'bottom', 'baseline'] },
    colspan: { control: 'number' },
    rowspan: { control: 'number' },
    truncate: { control: 'boolean' },
    width: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<TableCellComponent>;

export const Default: Story = {
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <ui-table [bordered]="true">
        <ui-table-body>
          <ui-table-row>
            <ui-table-cell>Left-aligned (default)</ui-table-cell>
            <ui-table-cell align="center">Centered</ui-table-cell>
            <ui-table-cell align="right">AED 349.99</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>`,
  }),
};

export const Truncated: Story = {
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <ui-table [bordered]="true" style="width:220px;display:block">
        <ui-table-body>
          <ui-table-row>
            <ui-table-cell [truncate]="true" width="200px">
              A very long description that will be truncated with an ellipsis instead of wrapping
            </ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>`,
  }),
};

export const SpannedCell: Story = {
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <ui-table [bordered]="true">
        <ui-table-body>
          <ui-table-row>
            <ui-table-cell [colspan]="3" align="center">No records found</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>`,
  }),
};