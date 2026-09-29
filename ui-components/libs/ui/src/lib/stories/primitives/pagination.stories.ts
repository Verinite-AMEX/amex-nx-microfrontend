import type { Meta, StoryObj } from '@storybook/angular';
import { PaginationComponent } from '../../primitives/pagination';

const meta: Meta<PaginationComponent> = {
  title: 'Primitives/Pagination',
  component: PaginationComponent,
  tags: [
    'autodocs',
    'a11y',
    'accessibility',
    'wcag',
    'keyboard-navigation',
    'screen-reader',
  ],
  argTypes: {
    currentPage: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
    pageChange: { action: 'pageChange' },

    variant: { control: 'select', options: ['numbered', 'compact'] },
    showFirstLast: { control: 'boolean' },
    showRangeLabel: { control: 'boolean' },
    rangeLabel: { control: 'text' },
    showPageSizeSelector: { control: 'boolean' },
    pageSizeLabel: { control: 'text' },
    pageSize: { control: 'object' },
    pageSizeOptions: { control: 'object' },
    pageSizeNativeAppearance: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<PaginationComponent>;

export const Default: Story = { args: { currentPage: 1, totalPages: 10 } };
export const MiddlePage: Story = { args: { currentPage: 5, totalPages: 10 } };
export const FewPages: Story = { args: { currentPage: 2, totalPages: 4 } };

// New: these three inputs (variant, showFirstLast, showPageSizeSelector)
// already existed on the component but never had story coverage before
// this upgrade — DLS's real .paginationV2 compact treatment was
// previously untested in Storybook entirely.
export const Compact: Story = {
  args: { variant: 'compact', currentPage: 3, totalPages: 10 },
};

export const CompactWithFirstLast: Story = {
  args: {
    variant: 'compact',
    currentPage: 3,
    totalPages: 10,
    showFirstLast: true,
  },
};

export const CompactWithPageSizeAndRange: Story = {
  args: {
    variant: 'compact',
    currentPage: 3,
    totalPages: 10,
    showPageSizeSelector: true,
    showRangeLabel: true,
    rangeLabel: '21–30 of 100',
  },
};