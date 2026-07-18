import type { Meta, StoryObj } from '@storybook/angular';
import { TableComponent } from './table';
import { TableHeadComponent } from './table-head';
import { TableBodyComponent } from './table-body';
import { TableFootComponent } from './table-foot';
import { TableRowComponent } from './table-row';
import { TableHeaderCellComponent } from './table-header-cell';
import { TableCellComponent } from './table-cell';

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
    ariaLabel: { control: 'text' },
    ariaLabelledBy: { control: 'text' },
    ariaDescribedBy: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<TableComponent>;

const baseTemplate = (opts: string) => `
  <ui-table ${opts}>
    <ui-table-head>
      <ui-table-row [header]="true">
        <ui-table-header-cell>Name</ui-table-header-cell>
        <ui-table-header-cell>Role</ui-table-header-cell>
        <ui-table-header-cell align="right">Status</ui-table-header-cell>
      </ui-table-row>
    </ui-table-head>
    <ui-table-body>
      <ui-table-row>
        <ui-table-cell>John Smith</ui-table-cell>
        <ui-table-cell>Master Admin</ui-table-cell>
        <ui-table-cell align="right">Active</ui-table-cell>
      </ui-table-row>
      <ui-table-row>
        <ui-table-cell>Jane Doe</ui-table-cell>
        <ui-table-cell>Sub Admin</ui-table-cell>
        <ui-table-cell align="right">Active</ui-table-cell>
      </ui-table-row>
    </ui-table-body>
  </ui-table>`;

export const Default: Story = {
  render: () => ({
    moduleMetadata: { imports: TABLE_IMPORTS },
    template: baseTemplate(''),
  }),
};

export const Bordered: Story = {
  render: () => ({
    moduleMetadata: { imports: TABLE_IMPORTS },
    template: baseTemplate('[bordered]="true"'),
  }),
};

export const Striped: Story = {
  render: () => ({
    moduleMetadata: { imports: TABLE_IMPORTS },
    template: baseTemplate('[striped]="true"'),
  }),
};

export const Compact: Story = {
  render: () => ({
    moduleMetadata: { imports: TABLE_IMPORTS },
    template: baseTemplate('[compact]="true" [bordered]="true"'),
  }),
};

export const WithCaptionAndFooter: Story = {
  render: () => ({
    moduleMetadata: { imports: TABLE_IMPORTS },
    template: `
      <ui-table caption="User accounts as of 25 Mar 2024" [bordered]="true">
        <ui-table-head>
          <ui-table-row [header]="true">
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