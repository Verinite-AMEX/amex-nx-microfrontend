import type { Meta, StoryObj } from '@storybook/angular';
import { AmexDownloadUserGuidePanelComponent } from './download-user-guide-panel';

const meta: Meta<AmexDownloadUserGuidePanelComponent> = {
  title: 'Patterns/Amex/DisplayViewers/DownloadUserGuidePanel',
  component: AmexDownloadUserGuidePanelComponent,
  tags: ['autodocs'],
  argTypes: {
    downloadGuide: { action: 'downloadGuide' },
    openVideo:     { action: 'openVideo' },
  
    videoUrl: { control: 'text' },
  },
  decorators: [(story) => ({ ...story(), template: `<div style="padding:20px;max-width:220px">${story().template}</div>` })],
};
export default meta;
type Story = StoryObj<AmexDownloadUserGuidePanelComponent>;

export const Default: Story = {
  name: 'Default — two purple buttons (matches OMS screenshot)',
  args: {
    showSectionHeader: false,
    guideButtonLabel: 'Download User Guide',
    videoButtonLabel: 'User guide Video',
  },
};

export const WithSectionHeader: Story = {
  name: 'With section header',
  args: {
    showSectionHeader: true,
    sectionHeaderText: 'Help & Resources',
    guideButtonLabel: 'Download User Guide',
    videoButtonLabel: 'User guide Video',
    description: 'Download the user guide PDF or watch the video tutorial for step-by-step instructions.',
  },
};

export const WithDescription: Story = {
  name: 'With description text',
  args: {
    guideButtonLabel: 'Download User Guide',
    videoButtonLabel: 'User guide Video',
    description: 'Use these resources to get started with the OMS Portal.',
  },
};