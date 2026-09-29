import type { Meta, StoryObj } from '@storybook/angular';
import { AccordionComponent } from '../../composite/accordion';

const ITEMS = [
  {
    id: '1',
    title: 'What is Angular?',
    content:
      'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.',
  },
  {
    id: '2',
    title: 'What is Storybook?',
    content:
      'Storybook is an open source tool for building UI components and pages in isolation.',
  },
  {
    id: '3',
    title: 'What is Nx?',
    content:
      'Nx is a smart, fast and extensible build system with first class monorepo support.',
  },
];

const meta: Meta<AccordionComponent> = {
  title: 'Composite/Accordion',
  component: AccordionComponent,
  tags: [
    'autodocs',
    'a11y',
    'accessibility',
    'wcag',
    'keyboard-navigation',
    'screen-reader',
  ],
  argTypes: {
    multiple: { control: 'boolean' },
    items: { control: 'object' },
    headingLevel: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
      description:
        'Semantic heading level (role="heading"/aria-level) wrapping each header button, matching DLS\u2019s real Accordion pattern.',
    },
    dividerColor: {
      control: 'color',
      description:
        'Outer list border/divider color. Not covered by DLS (its accordion CSS is nav-sidebar specific) \u2014 customizable per consumer, defaults to #e0e0e0.',
    },
    borderRadius: {
      control: 'text',
      description: 'Outer list corner radius. Same rationale as dividerColor.',
    },
  },
};
export default meta;
type Story = StoryObj<AccordionComponent>;

export const Default: Story = { args: { items: ITEMS } };
export const MultipleOpen: Story = { args: { items: ITEMS, multiple: true } };
export const CustomHeadingLevel: Story = {
  args: { items: ITEMS, headingLevel: 2 },
};
export const CustomDivider: Story = {
  args: { items: ITEMS, dividerColor: '#006fcf', borderRadius: '12px' },
};