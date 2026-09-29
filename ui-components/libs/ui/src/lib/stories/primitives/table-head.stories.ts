// libs/ui/src/lib/stories/primitives/table-head.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { TableHeadComponent } from '../../primitives/table-head';
import { TableComponent } from '../../primitives/table';
import { TableRowComponent } from '../../primitives/table-row';
import { TableHeaderCellComponent } from '../../primitives/table-header-cell';
import { TableBodyComponent } from '../../primitives/table-body';
import { TableCellComponent } from '../../primitives/table-cell';

const IMPORTS = [
  TableComponent,
  TableRowComponent,
  TableHeaderCellComponent,
  TableBodyComponent,
  TableCellComponent,
];

const meta: Meta<TableHeadComponent> = {
  title: 'Primitives/TableHead',
  component: TableHeadComponent,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;
type Story = StoryObj<TableHeadComponent>;

export const Default: Story = {
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <ui-table [bordered]="true">
        <ui-table-head>
          <ui-table-row>
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