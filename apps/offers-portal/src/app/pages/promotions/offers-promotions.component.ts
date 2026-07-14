import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

import {
  AmexPageHeaderComponent,
  AmexBreadcrumbTrailComponent,
  AmexStatusBadgeComponent,
  AmexStatus,
  AmexCardBadgeComponent,
  AmexCardType,
  AmexPointsDisplayComponent,
  AmexSuccessToastComponent,
  AmexConfirmationModalComponent,
} from "@ui-components/ui";

interface Promotion {
  id: string;
  title: string;
  description: string;
  category: string;
  pointsMultiplier?: number;
  cashbackPercent?: number;
  startDate: string;
  endDate: string;
  eligibleCards: AmexCardType[];
  status: AmexStatus;
  enrolled: boolean;
  merchant?: string;
}

@Component({
  selector: "app-offers-promotions",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmexPageHeaderComponent,
    AmexBreadcrumbTrailComponent,
    AmexStatusBadgeComponent,
    AmexCardBadgeComponent,
    AmexPointsDisplayComponent,
    AmexSuccessToastComponent,
    AmexConfirmationModalComponent,
  ],
  templateUrl: "./offers-promotions.component.html",
  styleUrls: ["./offers-promotions.component.css"],
})
export class OffersPromotionsComponent implements OnInit {
  successMsg = "";
  showModal = false;
  modalMsg = "";

  searchTerm = "";
  activeFilter = "All";

  pendingAction: (() => void) | null = null;

  readonly statusFilters = ["All", "Active", "Upcoming", "Expired"];

  breadcrumbs = [
    { id: "home", label: "Home" },
    { id: "offers", label: "Offers & Benefits" },
    { id: "promotions", label: "Promotions" },
  ];

  promotions: Promotion[] = [
    {
      id: "P01",
      title: "Summer Dining Bonus",
      description: "Earn 5× points at all restaurants this summer.",
      category: "Dining",
      pointsMultiplier: 5,
      startDate: "Jun 1, 2025",
      endDate: "Aug 31, 2025",
      eligibleCards: ["gold", "platinum", "centurion"],
      status: "active",
      enrolled: true,
    },
    {
      id: "P02",
      title: "Travel More Rewards",
      description: "3× points on travel bookings via Amex Travel.",
      category: "Travel",
      pointsMultiplier: 3,
      startDate: "Jun 1, 2025",
      endDate: "Jul 31, 2025",
      eligibleCards: ["platinum", "centurion"],
      status: "active",
      enrolled: false,
      merchant: "Amex Travel",
    },
    {
      id: "P03",
      title: "Uber Eats Cashback",
      description: "20% cashback on Uber Eats orders above $30.",
      category: "Dining",
      cashbackPercent: 20,
      startDate: "Jun 10, 2025",
      endDate: "Jun 25, 2025",
      eligibleCards: ["green", "gold"],
      status: "active",
      enrolled: true,
      merchant: "Uber Eats",
    },
    {
      id: "P04",
      title: "Amazon Prime Day Special",
      description: "10% cashback during Prime Day.",
      category: "Shopping",
      cashbackPercent: 10,
      startDate: "Jul 8, 2025",
      endDate: "Jul 9, 2025",
      eligibleCards: ["green", "gold", "platinum"],
      status: "pending",
      enrolled: false,
      merchant: "Amazon",
    },
    {
      id: "P05",
      title: "Holiday Shopping Boost",
      description: "4× points at retail stores.",
      category: "Shopping",
      pointsMultiplier: 4,
      startDate: "Nov 1, 2025",
      endDate: "Dec 31, 2025",
      eligibleCards: ["gold", "platinum", "centurion"],
      status: "pending",
      enrolled: false,
    },
    {
      id: "P06",
      title: "Spring Travel Special",
      description: "Double miles on international flights.",
      category: "Travel",
      pointsMultiplier: 2,
      startDate: "Apr 1, 2025",
      endDate: "Apr 30, 2025",
      eligibleCards: ["platinum", "centurion"],
      status: "expired",
      enrolled: false,
    },
    {
      id: "P07",
      title: "Gas Station Rewards",
      description: "Triple points at gas stations.",
      category: "Auto",
      pointsMultiplier: 3,
      startDate: "Jun 1, 2025",
      endDate: "Jul 31, 2025",
      eligibleCards: ["green", "gold", "platinum"],
      status: "active",
      enrolled: false,
    },
    {
      id: "P08",
      title: "Centurion Dining Exclusive",
      description: "10× points at Michelin-starred restaurants.",
      category: "Dining",
      pointsMultiplier: 10,
      startDate: "Jun 1, 2025",
      endDate: "Dec 31, 2025",
      eligibleCards: ["centurion"],
      status: "active",
      enrolled: true,
    },
  ];

  constructor(public router: Router) {}

  ngOnInit(): void {}

  get filteredPromotions(): Promotion[] {
    const statusMap: Record<string, string> = {
      Active: "active",
      Upcoming: "pending",
      Expired: "expired",
    };

    return this.promotions.filter((promotion) => {
      const statusMatch =
        this.activeFilter === "All" ||
        promotion.status === statusMap[this.activeFilter];

      const searchMatch =
        !this.searchTerm ||
        promotion.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (promotion.merchant ?? "")
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());

      return statusMatch && searchMatch;
    });
  }

  get activeCount(): number {
    return this.promotions.filter((p) => p.status === "active").length;
  }

  get enrolledCount(): number {
    return this.promotions.filter((p) => p.enrolled).length;
  }

  get upcomingCount(): number {
    return this.promotions.filter((p) => p.status === "pending").length;
  }

  get expiredCount(): number {
    return this.promotions.filter((p) => p.status === "expired").length;
  }

  onEnroll(promotion: Promotion): void {
    this.pendingAction = () => {
      promotion.enrolled = true;
      this.successMsg = `Enrolled in "${promotion.title}".`;
    };

    this.modalMsg = `Enroll in "${promotion.title}"?`;
    this.showModal = true;
  }

  onUnenroll(promotion: Promotion): void {
    this.pendingAction = () => {
      promotion.enrolled = false;
      this.successMsg = `Unenrolled from "${promotion.title}".`;
    };

    this.modalMsg = `Unenroll from "${promotion.title}"?`;
    this.showModal = true;
  }

  confirmAction(): void {
    if (this.pendingAction) {
      this.pendingAction();
      this.pendingAction = null;
    }

    this.showModal = false;
  }

  onBreadcrumb(id: string): void {
    switch (id) {
      case "home":
        this.router.navigate(["/"]);
        break;

      case "offers":
        this.router.navigate(["/offers"]);
        break;
    }
  }
}
