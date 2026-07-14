import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import {
  AmexOfferCardComponent,
  AmexOffer,
  AmexSuccessToastComponent,
  AmexConfirmationModalComponent,
} from "@ui-components/ui";

interface Category {
  id: string;
  label: string;
  icon: string;
}

interface Offer extends AmexOffer {
  bg: string;
  merchant: string;
  category: string;
  terms: string;
}

@Component({
  selector: "app-offers-catalogue",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmexOfferCardComponent,
    AmexSuccessToastComponent,
    AmexConfirmationModalComponent,
  ],
  templateUrl: "./offers-catalogue.component.html",
  styleUrls: ["./offers-catalogue.component.css"],
})
export class OffersCatalogueComponent {
  successMsg = "";
  showModal = false;
  modalMsg = "";

  searchTerm = "";
  activeCategory = "all";

  selectedOffer: Offer | null = null;
  pendingEnroll: Offer | null = null;

  enrolledSuccess = false;

  categories: Category[] = [
    { id: "all", label: "All", icon: "🌐" },
    { id: "fav", label: "Favorites", icon: "❤️" },
    { id: "travel", label: "Travel", icon: "✈️" },
    { id: "shop", label: "Shopping", icon: "🛍️" },
    { id: "ent", label: "Entertainment", icon: "🎵" },
    { id: "spa", label: "Spa", icon: "🍶" },
    { id: "clinic", label: "Clinic", icon: "➕" },
    { id: "promo", label: "Promotional Campaigns", icon: "🎁" },
  ];

  offers: Offer[] = [
    {
      id: "O01",
      title: "DINING CASHBACK",
      merchant: "Dining Cashback",
      description:
        "Discover new culinary horizons and savor exclusive dining delights with our 10% cashback offer. As a premium member, indulge in unforgettable culinary experiences at your favorite restaurants, knowing you will earn cashback on every bite, capped at AED 50 per month.",
      category: "all",
      expiryDate: "31 Dec, 2025",
      terms:
        "American Express reserves the right to modify or cancel this offer at any time.",
      bg: "linear-gradient(135deg,#2c5282,#4299e1)",
      enrolled: false,
    },
    {
      id: "O02",
      title: "GENERAL OFFER ⚡",
      merchant: "Bowling Maniac 1",
      description:
        "Enjoy exclusive offers at bowling alleys and entertainment venues.",
      category: "ent",
      expiryDate: "31 Dec, 2024",
      terms:
        "American Express reserves the right to modify or cancel this offer at any time.",
      bg: "linear-gradient(135deg,#553c9a,#805ad5)",
      enrolled: false,
    },
    {
      id: "O03",
      title: "TRAVEL REWARDS",
      merchant: "Emirates Airlines",
      description:
        "Earn 5× Membership Rewards points on all Emirates flights booked directly.",
      category: "travel",
      expiryDate: "08 Oct, 2047",
      terms:
        "American Express reserves the right to modify or cancel this offer at any time.",
      bg: "linear-gradient(135deg,#2d3748,#4a5568)",
      enrolled: true,
    },
    {
      id: "O04",
      title: "SPA & WELLNESS",
      merchant: "Talise Spa",
      description:
        "Enjoy 20% off on all spa treatments at Jumeirah properties.",
      category: "spa",
      expiryDate: "25 Dec, 2025",
      terms:
        "American Express reserves the right to modify or cancel this offer at any time.",
      bg: "linear-gradient(135deg,#276749,#48bb78)",
      enrolled: false,
    },
    {
      id: "O05",
      title: "SHOPPING CASHBACK",
      merchant: "Mall of Emirates",
      description:
        "Get 10% cashback on shopping at Mall of Emirates, up to AED 200 per month.",
      category: "shop",
      expiryDate: "31 Mar, 2025",
      terms:
        "American Express reserves the right to modify or cancel this offer at any time.",
      bg: "linear-gradient(135deg,#c05621,#f6ad55)",
      enrolled: false,
    },
    {
      id: "O06",
      title: "CLINIC BENEFIT",
      merchant: "Aster Clinic",
      description:
        "30% discount on consultation fees at all Aster Clinics across UAE.",
      category: "clinic",
      expiryDate: "30 Jun, 2025",
      terms:
        "American Express reserves the right to modify or cancel this offer at any time.",
      bg: "linear-gradient(135deg,#cc0000,#e53e3e)",
      enrolled: false,
    },
    {
      id: "O07",
      title: "SAVE TO CARD OFFER ⚡",
      merchant: "American Express",
      description:
        "Exclusive promotional campaign offer saved directly to your card.",
      category: "promo",
      expiryDate: "25 Dec, 2027",
      terms:
        "American Express reserves the right to modify or cancel this offer at any time.",
      bg: "linear-gradient(135deg,#006fcf,#4299e1)",
      enrolled: false,
    },
    {
      id: "O08",
      title: "LOUNGE ACCESS",
      merchant: "Centurion Lounge",
      description:
        "Unlimited access to all Centurion Lounges and 1,400+ partner lounges worldwide.",
      category: "travel",
      expiryDate: "Ongoing",
      terms:
        "American Express reserves the right to modify or cancel this offer at any time.",
      bg: "linear-gradient(135deg,#1a1a1a,#4a4a4a)",
      enrolled: true,
    },
  ];

  get filteredOffers(): Offer[] {
    return this.offers.filter((offer) => {
      const categoryMatch =
        this.activeCategory === "all" || offer.category === this.activeCategory;

      const searchMatch =
        !this.searchTerm ||
        offer.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        offer.merchant.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        offer.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }

  openDetail(offer: Offer): void {
    this.selectedOffer = offer;
    this.enrolledSuccess = false;
  }

  enrollOffer(offer: Offer): void {
    this.pendingEnroll = offer;
    this.modalMsg = `Enroll in "${offer.merchant || offer.title}"?`;
    this.showModal = true;
  }

  confirmEnroll(): void {
    if (this.pendingEnroll) {
      this.pendingEnroll.enrolled = true;
      this.enrolledSuccess = true;
      this.pendingEnroll = null;
    }

    this.showModal = false;
  }

  prevOffer(): void {
    if (!this.selectedOffer) return;

    const index = this.offers.indexOf(this.selectedOffer);
    this.selectedOffer =
      this.offers[(index - 1 + this.offers.length) % this.offers.length];

    this.enrolledSuccess = false;
  }

  nextOffer(): void {
    if (!this.selectedOffer) return;

    const index = this.offers.indexOf(this.selectedOffer);
    this.selectedOffer = this.offers[(index + 1) % this.offers.length];

    this.enrolledSuccess = false;
  }
}
