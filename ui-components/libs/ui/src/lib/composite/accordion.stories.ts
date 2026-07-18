import type { Meta, StoryObj } from '@storybook/angular';
import { AccordionComponent } from './accordion';

const ITEMS = [
  { id: '1', title: 'What is Angular?', content: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.' },
  { id: '2', title: 'What is Storybook?', content: 'Storybook is an open source tool for building UI components and pages in isolation.' },
  { id: '3', title: 'What is Nx?', content: 'Nx is a smart, fast and extensible build system with first class monorepo support.' },
];

const meta: Meta<AccordionComponent> = {
  title: 'Composite/Accordion',
  component: AccordionComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'keyboard-navigation', 'screen-reader'],
  argTypes: {
    multiple: { control: 'boolean' },
    items: { control: 'object' },
  },
};
export default meta;
type Story = StoryObj<AccordionComponent>;

export const Default: Story = { args: { items: ITEMS } };
export const MultipleOpen: Story = { args: { items: ITEMS, multiple: true } };