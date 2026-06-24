import type { Meta, StoryObj } from '@storybook/angular';
import { AmexTabBarComponent } from './tab-bar';

const meta: Meta<AmexTabBarComponent> = {
  title: 'AMEX/Navigation/TabBar',
  component: AmexTabBarComponent,
  tags: ['autodocs'],
  argTypes: { portalStyle: { control: 'radio', options: ['onls','oms'] } },
};
export default meta;
type Story = StoryObj<AmexTabBarComponent>;

const onlsTabs = [
  { id:'misc', label:'MISC' }, { id:'oas', label:'ONLINE ACCOUNT SERVICES' },
  { id:'stmt', label:'STATEMENTS' }, { id:'pb', label:'POINT BOOSTER' },
  { id:'cp', label:'CHANGE PASSWORD' }, { id:'bureau', label:'BUREAU' },
  { id:'centurion', label:'CENTURION' }, { id:'vat', label:'VAT INVOICE' },
];
const prioritySub = [
  { id:'priority', label:'ENROLL FOR PRIORITY PASS™' },
  { id:'supp', label:'Supplementary Access' },
  { id:'wallet', label:'Digital Wallet' },
  { id:'wearables', label:'AMEX Wearables' },
];
const socTabs = [
  { id:'masters', label:'MASTERS' }, { id:'merchant', label:'MERCHANT DATA' },
  { id:'socroc', label:"SOC'S & ROC'S" }, { id:'util', label:'UTILITIES' },
  { id:'reports', label:'REPORTS' }, { id:'retrieval', label:'RETRIEVAL' },
  { id:'algeria', label:'ALGERIA PAYMENT' }, { id:'payreg', label:'PAYMENT REGISTER' },
];
const omsTabs = [
  { id:'settlement', label:'Settlement and Submissions' },
  { id:'profile', label:'Edit Your Profile' },
  { id:'subuser', label:'Sub User Administration' },
  { id:'password', label:'Change Your Password' },
  { id:'terms', label:'Terms & Conditions' },
  { id:'daterange', label:'Date Range' },
  { id:'search', label:'Search Reports' },
  { id:'custom', label:'Customized Reports' },
];

export const ONLS_MainTabs: Story = {
  name: 'ONLS — Main tabs (MISC active)',
  args: { portalStyle: 'onls', tabs: onlsTabs, activeTabId: 'misc' },
};
export const ONLS_WithSubRow: Story = {
  name: 'ONLS — Main tabs + Sub-row (Priority Pass active)',
  args: { portalStyle: 'onls', tabs: onlsTabs, activeTabId: 'misc', subItems: prioritySub, activeSubId: 'priority' },
};
export const ONLS_ChangePassword: Story = {
  name: 'ONLS — CHANGE PASSWORD active',
  args: { portalStyle: 'onls', tabs: onlsTabs, activeTabId: 'cp' },
};
export const ONLS_SOCROCTabs: Story = {
  name: "ONLS — SOC's & ROC's Portal",
  args: { portalStyle: 'onls', tabs: socTabs, activeTabId: 'socroc' },
};
export const OMS_UserTabs: Story = {
  name: 'OMS — Edit Your Profile active',
  args: { portalStyle: 'oms', tabs: omsTabs, activeTabId: 'profile' },
};
export const OMS_MRMTabs: Story = {
  name: 'OMS — MRM Users active',
  args: {
    portalStyle: 'oms',
    tabs: [
      { id:'settlement', label:'Settlement and Submissions' },
      { id:'omsusers', label:'OMS Users' },
      { id:'mrmusers', label:'MRM Users' },
      { id:'password', label:'Change Your Password' },
      { id:'migration', label:'Old Users Migration' },
      { id:'vat', label:'VAT Invoice' },
    ],
    activeTabId: 'mrmusers',
  },
};
