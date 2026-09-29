// libs/ui/src/lib/stories/primitives/table-cell.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { TableCellComponent } from '../../primitives/table-cell';
import { TableComponent } from '../../primitives/table';
import { TableBodyComponent } from '../../primitives/table-body';
import { TableRowComponent } from '../../primitives/table-row';

const IMPORTS = [TableComponent, TableBodyComponent, TableRowComponent];

const meta: Meta<TableCellComponent> = {
  title: 'Primitives/TableCell',
  component: TableCellComponent,
  tags: ['autodocs'],
  argTypes: {
    align: { control: 'select', options: ['left', 'center', 'right'] },
    colspan: { control: 'number' },
    rowspan: { control: 'number' },
    nowrap: { control: 'boolean' },
    checkable: { control: 'boolean' },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    checkedChange: { action: 'checkedChange' },
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

export const Nowrap: Story = {
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <ui-table [bordered]="true" style="width:220px;display:block">
        <ui-table-body>
          <ui-table-row>
            <ui-table-cell [nowrap]="true">
              A long single-line value that should not wrap
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

export const Checkable: Story = {
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <ui-table [bordered]="true">
        <ui-table-body>
          <ui-table-row>
            <ui-table-cell [checkable]="true" checkboxLabel="Select John Smith"></ui-table-cell>
            <ui-table-cell>John Smith</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>`,
  }),
};