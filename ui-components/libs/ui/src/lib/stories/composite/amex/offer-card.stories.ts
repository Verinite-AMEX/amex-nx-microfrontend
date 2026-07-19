import type { Meta, StoryObj } from '@storybook/angular';
import { AmexOfferCardComponent } from '../../../composite/amex/offer-card';

const meta: Meta<AmexOfferCardComponent> = {
  title: 'Composite/Amex/OfferCard',
  component: AmexOfferCardComponent,
  tags: ['autodocs'],
  argTypes: {
    enroll:         { action: 'enroll' },
    unenroll:       { action: 'unenroll' },
    cardClick:      { action: 'cardClick' },
    toggleFavorite: { action: 'toggleFavorite' },
    close:          { action: 'close' },
    prev:           { action: 'prev' },
    next:           { action: 'next' },
  
    tileImageHeight: { control: 'text' },
    detailImageHeight: { control: 'text' },
    imageFallbackText: { control: 'text' },
    showNav: { control: 'boolean' },
    uppercaseTitle: { control: 'boolean' },
    enrolledBadgeLabel: { control: 'text' },
    expiryLabelPrefix: { control: 'text' },
    enrolledStatusLabel: { control: 'text' },
    notEnrolledStatusLabel: { control: 'text' },
    descriptionLabel: { control: 'text' },
    tncLabel: { control: 'text' },
    enrollLabel: { control: 'text' },
    unenrollLabel: { control: 'text' },
    flashIcon: { control: 'text' },
    favoriteOnIcon: { control: 'text' },
    favoriteOffIcon: { control: 'text' },
    closeIcon: { control: 'text' },
    prevIcon: { control: 'text' },
    nextIcon: { control: 'text' },
    favoriteOnVariant: { control: 'text' },
    favoriteOffVariant: { control: 'text' },
    enrollVariant: { control: 'text' },
    unenrollVariant: { control: 'text' },
    detailButtonSize: { control: 'text' },
    addFavoriteAriaLabel: { control: 'text' },
    removeFavoriteAriaLabel: { control: 'text' },
    closeAriaLabel: { control: 'text' },
    prevAriaLabel: { control: 'text' },
    nextAriaLabel: { control: 'text' },
    enrollAriaLabel: { control: 'text' },
    unenrollAriaLabel: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<AmexOfferCardComponent>;

// --- Shared sample offers -----------------------------------------------------
const diningOffer = {
  id: '1',
  title: 'General Offer',
  description: 'Bowling Maniac 1',
  category: 'Dining',
  expiryDate: '31 Dec, 2024',
  imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop',
  hasFlash: true,
  enrolled: false,
  isFavorite: false,
  termsAndConditions: 'American Express reserves the right to modify / cancel this anytime.',
};

const travelOffer = {
  id: '2',
  title: 'Renaming Customer File With Filled Data',
  description: 'Correct File format',
  category: 'Travel',
  expiryDate: '08 Oct, 2047',
  imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop',
  hasFlash: true,
  enrolled: false,
  isFavorite: false,
  termsAndConditions: 'American Express reserves the right to modify / cancel this anytime.',
};

const enrolledOffer = {
  id: '3',
  title: 'Customer View',
  description: 'Correct File format',
  category: 'Shopping',
  expiryDate: '08 Oct, 2047',
  imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&auto=format&fit=crop',
  hasFlash: true,
  enrolled: true,
  isFavorite: false,
  termsAndConditions: 'American Express reserves the right to modify / cancel this anytime.',
};

const noImageOffer = {
  id: '4',
  title: 'Long Offer Name With Flash And Save To Card Offerr',
  description: 'long offer name with flash and Save to Card offerr',
  category: 'Promotional Campaigns',
  expiryDate: '25 Dec, 2027',
  hasFlash: true,
  enrolled: false,
  isFavorite: false,
  termsAndConditions: 'American Express reserves the right to modify / cancel this anytime.',
};

// --- GRID TILE STORIES --------------------------------------------------------

/** Standard tile — not enrolled, with image */
export const TileAvailable: Story = {
  name: 'Tile / Available',
  decorators: [
    (story) => ({ ...story(), template: `<div style="width:300px">${story().template}</div>` }),
  ],
  args: { detailMode: false, offer: diningOffer },
};

/** Tile — enrolled state */
export const TileEnrolled: Story = {
  name: 'Tile / Enrolled',
  decorators: [
    (story) => ({ ...story(), template: `<div style="width:300px">${story().template}</div>` }),
  ],
  args: { detailMode: false, offer: enrolledOffer },
};

/** Tile — no hero image (AMERICAN EXPRESS placeholder) */
export const TileNoImage: Story = {
  name: 'Tile / No Image (placeholder)',
  decorators: [
    (story) => ({ ...story(), template: `<div style="width:300px">${story().template}</div>` }),
  ],
  args: { detailMode: false, offer: noImageOffer },
};

/** Three tiles in a 3-column grid — matches Browse by Category page */
export const TileGrid: Story = {
  name: 'Tile / 3-column Grid',
  decorators: [
    (story) => ({
      ...story(),
      template: `
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:20px;background:#f7f7f7;width:960px">
          ${story().template}
        </div>`,
    }),
  ],
  render: () => ({
    component: AmexOfferCardComponent,
    template: `
      <amex-offer-card [offer]="offer1" (cardClick)="cardClick($event)" (toggleFavorite)="toggleFavorite($event)"></amex-offer-card>
      <amex-offer-card [offer]="offer2" (cardClick)="cardClick($event)" (toggleFavorite)="toggleFavorite($event)"></amex-offer-card>
      <amex-offer-card [offer]="offer3" (cardClick)="cardClick($event)" (toggleFavorite)="toggleFavorite($event)"></amex-offer-card>
      <amex-offer-card [offer]="offer4" (cardClick)="cardClick($event)" (toggleFavorite)="toggleFavorite($event)"></amex-offer-card>
      <amex-offer-card [offer]="offer5" (cardClick)="cardClick($event)" (toggleFavorite)="toggleFavorite($event)"></amex-offer-card>
      <amex-offer-card [offer]="offer6" (cardClick)="cardClick($event)" (toggleFavorite)="toggleFavorite($event)"></amex-offer-card>
    `,
    props: {
      offer1: diningOffer,
      offer2: travelOffer,
      offer3: enrolledOffer,
      offer4: noImageOffer,
      offer5: { ...noImageOffer, id: '5', title: 'Save To Card Offer', description: '<body onscroll=alert(1)>...' },
      offer6: { ...diningOffer, id: '6', imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop' },
      cardClick: (o: unknown) => console.log('cardClick', o),
      toggleFavorite: (o: unknown) => console.log('toggleFavorite', o),
    },
  }),
};

// --- DETAIL VIEW STORIES ------------------------------------------------------

/** Detail panel — Not Enrolled (shows blue Enroll button) */
export const DetailNotEnrolled: Story = {
  name: 'Detail / Not Enrolled',
  decorators: [
    (story) => ({ ...story(), template: `<div style="width:620px">${story().template}</div>` }),
  ],
  args: {
    detailMode: true,
    offer: {
      ...diningOffer,
      title: 'Dining Cashback',
      description:
        'Discover new culinary horizons and savor exclusive dining delights with our 10% cashback offer. ' +
        'As a premium member, indulge in unforgettable culinary experiences at your favorite restaurants, ' +
        'knowing you\'ll earn cashback on every bite, capped at AED 50 per month',
      eligibleCards: ['gold', 'platinum'],
    },
  },
};

/** Detail panel — Enrolled (green "Enrolled" status) */
export const DetailEnrolled: Story = {
  name: 'Detail / Enrolled',
  decorators: [
    (story) => ({ ...story(), template: `<div style="width:620px">${story().template}</div>` }),
  ],
  args: {
    detailMode: true,
    offer: {
      ...diningOffer,
      title: 'Dining Cashback',
      enrolled: true,
      description:
        'Discover new culinary horizons and savor exclusive dining delights with our 10% cashback offer. ' +
        'As a premium member, indulge in unforgettable culinary experiences at your favorite restaurants, ' +
        'knowing you\'ll earn cashback on every bite, capped at AED 50 per month',
      eligibleCards: ['gold', 'platinum'],
    },
  },
};

/** Detail panel — no image, AMERICAN EXPRESS placeholder background */
export const DetailNoImage: Story = {
  name: 'Detail / No Image',
  decorators: [
    (story) => ({ ...story(), template: `<div style="width:620px">${story().template}</div>` }),
  ],
  args: {
    detailMode: true,
    offer: {
      ...noImageOffer,
      title: 'Save To Card Offer',
      description: 'Exclusive save-to-card promotional offer for eligible card members.',
      eligibleCards: ['platinum', 'centurion'],
    },
  },
};