import type { Meta, StoryObj } from '@storybook/angular';
import { AmexBreadcrumbTrailComponent } from './breadcrumb-trail';

const meta: Meta<AmexBreadcrumbTrailComponent> = {
  title: 'Patterns/Amex/Navigation/BreadcrumbTrail',
  component: AmexBreadcrumbTrailComponent,
  argTypes: {
    separator: { control: 'text' },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexBreadcrumbTrailComponent>;

export const BCRBUpload: Story = {
  name: 'BCRB — BUREAU > BCRB REPORT > AECB UPLOAD',
  args: {
    items: [
      { id:'bureau', label:'BUREAU' },
      { id:'bcrb', label:'BCRB REPORT' },
      { id:'aecb', label:'AECB UPLOAD' },
    ],
    showBack: false,
  },
};
export const OMS_WithBack: Story = {
  name: 'OMS — with Back button',
  args: {
    items: [
      { id:'home', label:'Home' },
      { id:'profile', label:'Edit Your Profile' },
      { id:'merchant', label:'Update Merchant Details' },
    ],
    showBack: true,
  },
};