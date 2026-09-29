// libs/ui/src/lib/stories/primitives/table-row.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { TableRowComponent } from '../../primitives/table-row';
import { TableComponent } from '../../primitives/table';
import { TableBodyComponent } from '../../primitives/table-body';
import { TableCellComponent } from '../../primitives/table-cell';

const IMPORTS = [TableComponent, TableBodyComponent, TableCellComponent];

const meta: Meta<TableRowComponent> = {
  title: 'Primitives/TableRow',
  component: TableRowComponent,
  tags: [
    'autodocs',
    'a11y',
    'accessibility',
    'wcag',
    'keyboard-navigation',
    'screen-reader',
  ],
  argTypes: {
    selected: { control: 'boolean' },
    clickable: { control: 'boolean' },
    expandable: { control: 'boolean' },
    expanded: { control: 'boolean' },
    rowClick: { action: 'rowClick' },
    expandedChange: { action: 'expandedChange' },
  },
};
export default meta;
type Story = StoryObj<TableRowComponent>;

export const Default: Story = {
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <ui-table [bordered]="true">
        <ui-table-body>
          <ui-table-row>
            <ui-table-cell>John Smith</ui-table-cell>
            <ui-table-cell>Active</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>`,
  }),
};

export const Selected: Story = {
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <ui-table [bordered]="true">
        <ui-table-body>
          <ui-table-row [selected]="true">
            <ui-table-cell>Jane Doe</ui-table-cell>
            <ui-table-cell>Currently viewing</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>`,
  }),
};

export const Clickable: Story = {
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <ui-table [bordered]="true">
        <ui-table-body>
          <ui-table-row [clickable]="true" (rowClick)="onRowClick()">
            <ui-table-cell>Click this row</ui-table-cell>
            <ui-table-cell>Or press Enter while focused</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>`,
    props: {
      onRowClick: () => console.log('row clicked'),
    },
  }),
};

export const Expandable: Story = {
  render: () => ({
    moduleMetadata: { imports: IMPORTS },
    template: `
      <ui-table [bordered]="true">
        <ui-table-body>
          <ui-table-row
            [expandable]="true"
            [expanded]="true"
            expandLabel="row details"
            [expandColspan]="2"
          >
            <ui-table-cell>Jane Doe</ui-table-cell>
            <ui-table-cell>Active</ui-table-cell>
            <p expandedContent>Additional row detail shown when expanded.</p>
          </ui-table-row>
        </ui-table-body>
      </ui-table>`,
  }),
};