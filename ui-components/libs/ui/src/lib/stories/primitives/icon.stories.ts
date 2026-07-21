import type { Meta, StoryObj } from '@storybook/angular';
import { IconComponent } from '../../primitives/icon';

const meta: Meta<IconComponent> = {
  title: 'Primitives/Icon',
  component: IconComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'screen-reader'],
  argTypes: {
    glyph: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    ariaLabel: { control: 'text' },
    decorative: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<IconComponent>;

export const GlyphSmall: Story = {
  name: 'Glyph — Small',
  args: { glyph: '?', size: 'sm' },
};

export const GlyphMedium: Story = {
  name: 'Glyph — Medium',
  args: { glyph: '?', size: 'md' },
};

export const GlyphLarge: Story = {
  name: 'Glyph — Large',
  args: { glyph: '?', size: 'lg' },
};

export const Meaningful: Story = {
  name: 'Non-decorative (with aria-label)',
  args: { glyph: '?', size: 'md', decorative: false, ariaLabel: 'Warning' },
};

export const ProjectedSvg: Story = {
  name: 'Projected SVG content',
  args: { size: 'lg', decorative: false, ariaLabel: 'Checkmark' },
  render: (args) => ({
    props: args,
    template: `
      <ui-icon [size]="size" [decorative]="decorative" [ariaLabel]="ariaLabel">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </ui-icon>`,
  }),
};