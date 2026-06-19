import type { Meta, StoryObj } from '@storybook/angular';
import { AmexPortalHomeTilesComponent } from './portal-home-tiles';

const meta: Meta<AmexPortalHomeTilesComponent> = {
  title: 'AMEX/Navigation/PortalHomeTiles',
  component: AmexPortalHomeTilesComponent,
  tags: ['autodocs'],
  argTypes: {
    tileClick: { action: 'tileClick' },
    logout:    { action: 'logout' },
  },
};
export default meta;
type Story = StoryObj<AmexPortalHomeTilesComponent>;

/**
 * All 9 sub-portal tiles enabled — the default home screen after Hub Login.
 * Tiles from doc spec: SUPP_ACCESS_HELPER, QPAY_INQUIRY, VAT, Digital Wallet,
 * Amex Wearables, Centurion, Statements, Pay with Points, Priority Pass.
 */
export const AllTiles: Story = {
  name: 'All 9 tiles (default)',
  args: {
    portalTitle: 'ONLS Helper Tool',
    tiles: [
      { id: 'supp',      label: 'Supp Access Helper',  icon: '🪪', enabled: true  },
      { id: 'qpay',      label: 'QPay Inquiry',         icon: '💳', enabled: true  },
      { id: 'vat',       label: 'VAT Invoice',          icon: '🧾', enabled: true  },
      { id: 'wallet',    label: 'Digital Wallet',       icon: '📱', enabled: true  },
      { id: 'wearables', label: 'Amex Wearables',       icon: '⌚', enabled: true  },
      { id: 'centurion', label: 'Centurion',            icon: '🖤', enabled: true  },
      { id: 'stmts',     label: 'Statements',           icon: '📄', enabled: true  },
      { id: 'points',    label: 'Pay with Points',      icon: '⭐', enabled: true  },
      { id: 'lounge',    label: 'Priority Pass',        icon: '🛫', enabled: true  },
    ],
  },
};

/** Some tiles disabled — e.g. restricted user role */
export const SomeTilesDisabled: Story = {
  name: 'Some tiles disabled',
  args: {
    portalTitle: 'ONLS Helper Tool',
    tiles: [
      { id: 'supp',      label: 'Supp Access Helper',  icon: '🪪', enabled: true  },
      { id: 'qpay',      label: 'QPay Inquiry',         icon: '💳', enabled: false },
      { id: 'vat',       label: 'VAT Invoice',          icon: '🧾', enabled: true  },
      { id: 'wallet',    label: 'Digital Wallet',       icon: '📱', enabled: false },
      { id: 'wearables', label: 'Amex Wearables',       icon: '⌚', enabled: true  },
      { id: 'centurion', label: 'Centurion',            icon: '🖤', enabled: false },
      { id: 'stmts',     label: 'Statements',           icon: '📄', enabled: true  },
      { id: 'points',    label: 'Pay with Points',      icon: '⭐', enabled: true  },
      { id: 'lounge',    label: 'Priority Pass',        icon: '🛫', enabled: true  },
    ],
  },
};

/** Minimal — only 3 tiles (e.g. Supplementary Access portal subset) */
export const SubsetTiles: Story = {
  name: 'Supplementary Access subset',
  args: {
    portalTitle: 'ONLS Helper Tool',
    tiles: [
      { id: 'oas',   label: 'Online Account Services',   icon: '👤', enabled: true },
      { id: 'supp',  label: 'Supplementary Access',      icon: '🪪', enabled: true },
      { id: 'offers', label: 'Offers & Benefits',        icon: '🎁', enabled: true },
    ],
  },
};
