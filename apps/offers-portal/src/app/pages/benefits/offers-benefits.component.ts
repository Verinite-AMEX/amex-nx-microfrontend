import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexSuccessToastComponent } from '@ui-components/ui';

interface Benefit {
  id: string;
  title: string;
  description: string;
  bg: string;
  enrolled: boolean;
}

@Component({
  selector: 'app-offers-benefits',
  standalone: true,
  imports: [CommonModule, AmexSuccessToastComponent],
  templateUrl: './offers-benefits.component.html',
  styleUrls: ['./offers-benefits.component.css']
})
export class OffersBenefitsComponent {

  successMsg = '';
  benefits: Benefit[] = [
    {
      id: 'B01',
      title: 'DINING CASHBACK',
      description: 'Get 10% cashback on dining, up to AED 50 monthly',
      bg: 'linear-gradient(135deg,#2c5282,#4a90d9)',
      enrolled: true
    },
    {
      id: 'B02',
      title: 'BENEFIT',
      description: 'Enjoy benefit',
      bg: 'linear-gradient(135deg,#4a5568,#718096)',
      enrolled: false
    },
    {
      id: 'B03',
      title: 'LOUNGE ACCESS',
      description: 'Unlimited access to Centurion Lounges worldwide',
      bg: 'linear-gradient(135deg,#1a1a1a,#3a3a3a)',
      enrolled: true
    },
    {
      id: 'B04',
      title: 'TRAVEL INSURANCE',
      description: 'Comprehensive travel insurance coverage up to USD 500,000',
      bg: 'linear-gradient(135deg,#276749,#48bb78)',
      enrolled: false
    },
    {
      id: 'B05',
      title: 'PURCHASE PROTECTION',
      description: '90-day protection on eligible purchases against theft or damage',
      bg: 'linear-gradient(135deg,#c05621,#f6ad55)',
      enrolled: true
    },
    {
      id: 'B06',
      title: 'HOTEL CREDIT',
      description: 'Annual USD 200 credit on prepaid hotels via Amex Travel',
      bg: 'linear-gradient(135deg,#553c9a,#9f7aea)',
      enrolled: false
    }
  ];

  enroll(benefit: Benefit): void {
    benefit.enrolled = true;
    this.successMsg = `Enrolled in "${benefit.title}" successfully.`;
  }

}