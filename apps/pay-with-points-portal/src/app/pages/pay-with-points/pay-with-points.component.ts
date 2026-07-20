import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import {
  AmexEligibleTransactionsTableComponent,
  EligibleTransaction,
  PointsHistoryRow,
  AmexCardRow,
  FormFieldComponent,
  InputComponent,
  ButtonComponent,
} from "@ui-components/ui";

@Component({
  selector: "app-pay-with-points",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmexEligibleTransactionsTableComponent,
    FormFieldComponent,
    InputComponent,
    ButtonComponent,
  ],
  templateUrl: "./pay-with-points.component.html",
  styleUrls: ["./pay-with-points.component.css"],
})
export class PayWithPointsComponent implements OnInit {
  view: "form" | "select" = "form";

  clientCode = "";
  formError = "";

  selectedCardNumber = "";

  pointsBalance: number | null = null;
  aedEquivalent = 0;
  errorMessage = "";

  eligibleRows: EligibleTransaction[] = [];
  historyRows: PointsHistoryRow[] = [];

  totalCredit = "AED 0.00";
  totalPointsRedeemed = "0";

  cardRows: AmexCardRow[] = [];

  private mockDb: Record<
    string,
    {
      cards: AmexCardRow[];
      transactions: EligibleTransaction[];
      history: PointsHistoryRow[];
    }
  > = {
    "20473521": {
      cards: [
        { cardNumber: "3744XXXXXX9008", cardType: "Gold", status: "Active" },
        {
          cardNumber: "3744XXXXXX7712",
          cardType: "Platinum",
          status: "Active",
        },
        { cardNumber: "3744XXXXXX3301", cardType: "Green", status: "Inactive" },
      ],
      transactions: [
        {
          id: "1",
          transactionDate: "01 Apr 2025",
          description: "NOON.COM DUBAI",
          amount: "AED 250.00",
          pointsValue: "250",
          selected: false,
        },
        {
          id: "2",
          transactionDate: "05 Apr 2025",
          description: "CARREFOUR UAE",
          amount: "AED 130.00",
          pointsValue: "130",
          selected: false,
        },
        {
          id: "3",
          transactionDate: "10 Apr 2025",
          description: "EMIRATES AIRLINE",
          amount: "AED 1,200.00",
          pointsValue: "1200",
          selected: false,
        },
      ],
      history: [
        {
          transactionDate: "15 Jan 2025",
          description: "AMAZON AE",
          pointsRedeemed: "500",
          amountOffset: "AED 50.00",
          redemptionDate: "16 Jan 2025",
        },
        {
          transactionDate: "20 Feb 2025",
          description: "SPINNEYS DUBAI",
          pointsRedeemed: "300",
          amountOffset: "AED 30.00",
          redemptionDate: "21 Feb 2025",
        },
      ],
    },
  };

  ngOnInit(): void {}

  get cardOptions() {
    return this.cardRows.map((card) => ({
      value: card.cardNumber,
      label: card.cardNumber,
    }));
  }

  onSubmit(): void {
    this.formError = "";

    const code = this.clientCode.trim();

    if (!code) {
      this.formError = "Please enter a Client Code.";
      return;
    }

    const data = this.mockDb[code];

    this.cardRows = data?.cards ?? [];
    this.view = "select";

    this.resetCard();

    if (!this.cardRows.length) {
      this.errorMessage =
        "ERROR: Sorry, selected card is not eligible for the Select and Pay With Points benefit.";
    }
  }

  goToForm(): void {
    this.view = "form";
    this.clientCode = "";
    this.formError = "";
    this.cardRows = [];
    this.resetCard();
  }

  onCardSelected(cardNumber: string): void {
    this.resetCard();

    this.selectedCardNumber = cardNumber;

    if (!cardNumber) {
      return;
    }

    const card = this.cardRows.find((c) => c.cardNumber === cardNumber);

    if (!card) {
      return;
    }

    if (card.status.toLowerCase() !== "active") {
      this.errorMessage =
        "Sorry, selected card is not eligible for the Select and Pay with Points benefit.";
      return;
    }

    const data =
      this.mockDb[this.clientCode.trim()] ?? Object.values(this.mockDb)[0];

    this.pointsBalance = 85000;
    this.aedEquivalent = 850;
    this.eligibleRows = data.transactions.map((t) => ({
      ...t,
      selected: false,
    }));
    this.historyRows = data.history;
    this.totalCredit = data.history.length ? "AED 80.00" : "AED 0.00";
    this.totalPointsRedeemed = data.history.length ? "800" : "0";
  }

  onRedeemClick(selected: EligibleTransaction[]): void {
    const totalPoints = selected.reduce(
      (sum, transaction) =>
        sum + Number(transaction.pointsValue.replace(",", "")),
      0,
    );

    alert(
      `Redemption submitted for ${selected.length} transaction(s) - ${totalPoints.toLocaleString()} points.`,
    );
  }

  private resetCard(): void {
    this.selectedCardNumber = "";
    this.pointsBalance = null;
    this.aedEquivalent = 0;
    this.errorMessage = "";
    this.eligibleRows = [];
    this.historyRows = [];
    this.totalCredit = "AED 0.00";
    this.totalPointsRedeemed = "0";
  }
}