import type { Meta, StoryObj } from '@storybook/angular';
import { ModalComponent } from '../../composite/modal';
import { ModalStoryWrapperComponent } from './modal-story-wrapper.component';

const meta: Meta<ModalComponent> = {
  title: 'Composite/Modal',
  component: ModalComponent,
  tags: [
    'autodocs',
    'a11y',
    'accessibility',
    'wcag',
    'focus-management',
    'keyboard-navigation',
    'screen-reader',
  ],
  // Storybook's Docs page normally embeds every story inline inside a small
  // scrollable, CSS-transformed zoom container (to power the zoom controls).
  // A CSS transform on an ancestor changes the containing block for any
  // position:fixed descendant - so DLS's .modal/.modalScreen (which are
  // meant to cover the real browser viewport) end up trapped inside that
  // small container instead, causing the squashed/overlapping look seen on
  // the Docs page. This has no effect on real app usage or on the
  // individual story pages (which render in a real full-size iframe, not
  // a transformed container) - only the Docs preview needed this fix.
  // docs.story.inline:false tells Storybook to render this story in its own
  // real iframe on the Docs page too, sidestepping the transform entirely.
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    closeOnBackdrop: { control: 'boolean' },
    hasFooter: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<ModalComponent>;

export const Default: Story = {
  args: { title: 'Confirm Action', size: 'md', hasFooter: true },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ModalStoryWrapperComponent] },
    template: `
      <modal-story-wrapper
        [title]="title"
        [size]="size"
        [hasFooter]="hasFooter"
        [closeOnBackdrop]="closeOnBackdrop"
      >
        Are you sure you want to delete this item? This action cannot be undone.
      </modal-story-wrapper>`,
  }),
};

export const Large: Story = {
  args: { title: 'Terms of Service', size: 'lg' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [ModalStoryWrapperComponent] },
    template: `
      <modal-story-wrapper [title]="title" [size]="size">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </modal-story-wrapper>`,
  }),
};