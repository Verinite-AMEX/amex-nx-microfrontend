import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  AmexPageHeaderComponent,
  AmexBreadcrumbTrailComponent,
  AmexPointsDisplayComponent,
  AmexStatusBadgeComponent,
  AmexStatus,
  AmexOfferCardComponent,
  AmexOffer,
  AmexSuccessToastComponent,
  AmexConfirmationModalComponent,
} from '@ui-components/ui';

@Component({
  selector: 'app-offers-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AmexPageHeaderComponent,
    AmexBreadcrumbTrailComponent,
    AmexPointsDisplayComponent,
    AmexStatusBadgeComponent,
    AmexOfferCardComponent,
    AmexSuccessToastComponent,
    AmexConfirmationModalComponent,
  ],
  templateUrl: './offers-dashboard.component.html',
  styleUrls: ['./offers-dashboard.component.css'],
})
export class OffersDashboardComponent implements OnInit {

  toastMsg = '';
  showModal = false;
  modalMsg = '';
  pendingOffer: AmexOffer | null = null;

  breadcrumbs = [
    { id: 'home', label: 'Home' },
    { id: 'offers', label: 'Offers & Benefits' },
    { id: 'dashboard', label: 'Dashboard' },
  ];

  featuredOffers: AmexOffer[] = [
    {
      id: 'O01',
      title: '5× Points on Dining',
      description:
        'Earn 5× Membership Rewards pts at restaurants worldwide through Jun 30.',
      category: 'Dining',
      expiryDate: 'Jun 30',
      merchant: 'All Restaurants',
      eligibleCards: ['gold', 'platinum', 'centurion'],
      enrolled: true,
    },
    {
      id: 'O03',
      title: '$200 Hotel Credit',
      description:
        'Annual $200 credit on prepaid hotels booked via Amex Travel.',
      category: 'Travel',
      expiryDate: 'Jul 15',
      merchant: 'Amex Travel',
      eligibleCards: ['platinum', 'centurion'],
      enrolled: false,
    },
    {
      id: 'O04',
      title: 'Centurion Lounge Access',
      description:
        'Unlimited access to all Centurion Lounges & 1,400+ partner lounges.',
      category: 'Travel',
      expiryDate: 'Ongoing',
      merchant: 'Centurion Lounge',
      eligibleCards: ['centurion', 'platinum'],
      enrolled: true,
    },
  ];

  spotlightBenefits = [
    {
      icon: '✈️',
      bg: '#e8f0fe',
      title: 'Global Lounge Collection',
      desc: 'Access 1,400+ airport lounges worldwide.',
      status: 'active' as AmexStatus,
      statusLabel: 'Active',
    },
    {
      icon: '🏨',
      bg: '#e6f9f0',
      title: 'Hotel & Resort Credit',
      desc: 'Up to $200 credit on eligible hotels.',
      status: 'active' as AmexStatus,
      statusLabel: 'Active',
    },
    {
      icon: '💳',
      bg: '#fff8e1',
      title: 'Purchase Protection',
      desc: '90-day protection on eligible purchases.',
      status: 'active' as AmexStatus,
      statusLabel: 'Active',
    },
    {
      icon: '⭐',
      bg: '#fce4ec',
      title: 'Hilton Honors Gold',
      desc: 'Automatic Gold – upgrade & bonus points.',
      status: 'pending' as AmexStatus,
      statusLabel: 'Pending',
    },
  ];

  constructor(public router: Router) {}

  ngOnInit(): void {}

  onBreadcrumb(id: string): void {
    if (id === 'home') {
      this.router.navigate(['/']);
    }

    if (id === 'offers') {
      this.router.navigate(['/offers']);
    }
  }

  onEnroll(offer: AmexOffer): void {
    this.pendingOffer = offer;
    this.modalMsg = `Enroll card member in "${offer.title}"?`;
    this.showModal = true;
  }

  confirmEnroll(): void {
    if (this.pendingOffer) {
      this.pendingOffer.enrolled = true;
      this.toastMsg = `Enrolled in "${this.pendingOffer.title}".`;
      this.pendingOffer = null;
    }

    this.showModal = false;
  }

  onUnenroll(offer: AmexOffer): void {
    offer.enrolled = false;
    this.toastMsg = `Unenrolled from "${offer.title}".`;
  }
}