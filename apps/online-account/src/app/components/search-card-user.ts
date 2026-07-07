import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  AmexDashboardMenuBarComponent,
  ButtonComponent,
  InputComponent,
  AmexSOCROCRecordsTableComponent,
  AmexPaymentRegisterTableComponent,
  AmexCardMemberDetailsViewComponent,
  AmexSortableFilterableTableComponent,
} from "@vn-core-ui-components/ui";
import { AmexCaseManagementListComponent } from "@vn-core-ui-components/ui";
import { AmexSidebarMenuComponent } from "@vn-core-ui-components/ui";
import { AmexPageHeaderComponent } from "@vn-core-ui-components/ui";
import { UserSearch } from "./service/user-search";
import { Account, AccessGroupModel } from "../model/account.model";
@Component({
  selector: "app-search-card-user",
  standalone: true,

  imports: [
    FormsModule,
    AmexDashboardMenuBarComponent,
    ButtonComponent,
    InputComponent,
    AmexSOCROCRecordsTableComponent,
    AmexPaymentRegisterTableComponent,
    AmexCardMemberDetailsViewComponent,
    AmexCaseManagementListComponent,
    AmexSortableFilterableTableComponent,
    AmexSidebarMenuComponent,
    AmexPageHeaderComponent,
  ],

  templateUrl: "./search-card-user.html",
  styleUrls: ["./search-card-user.css"],
})
export class SearchCardUser {
  accountService = inject(UserSearch);

  accountData: Account | null = null;
  supplementaryData: AccessGroupModel | null = null;

  userId = "";
  cardNo = "";

  suppUserId = "";
  suppCardNo = "";

  activeSection = "onlineaccount";

  changeSection(sectionId: string) {
    console.log("Changing section to:", sectionId);
    this.activeSection = sectionId;
  }

  onSearch(): void {
    console.log("cardNo:", this.cardNo);
    console.log("userId:", this.userId);

    const userId = this.userId?.trim();
    const cardNo = this.cardNo?.trim();

    // Validation
    if (!userId && !cardNo) {
      alert("Please enter Card Number or User ID");
      return;
    }

    // If both entered
    if (userId && cardNo) {
      alert("Please enter only one field: Card Number or User ID");
      return;
    }

    // Search by User ID
    if (userId) {
      console.log("Searching by User ID:", userId);

      this.accountService.getAccountByUserId(userId).subscribe({
        next: (response) => {
          this.accountData = response;
          console.log(response);
        },
        error: (err) => {
          this.accountData = null; // Clear previous data
          console.error(err);

          alert(err.error?.message || "User not found");
        },
      });

      return;
    }

    // Search by Card Number
    if (cardNo) {
      console.log("Searching by Card Number:", cardNo);

      this.accountService.getAccountByCardNo(cardNo).subscribe({
        next: (response) => {
          this.accountData = response;
        },
        error: (err) => {
          this.accountData = null; // Clear previous data
          console.error(err);

          alert(err.error?.message || "Card not found");
        },
      });
    }
  }

  onReset(): void {
    // Online Account
    this.userId = "";
    this.cardNo = "";
    this.accountData = null;

    // Supplementary
    this.suppUserId = "";
    this.suppCardNo = "";
    this.supplementaryData = null;

    console.log("Search form reset");
  }

  // supplimentory code

  onSuppSearch(): void {
    const userId = this.suppUserId?.trim();
    const cardNo = this.suppCardNo?.trim();

    if (!userId && !cardNo) {
      alert("Please enter Card Number or User ID");
      return;
    }

    if (userId && cardNo) {
      alert("Please enter only one field: Card Number or User ID");
      return;
    }

    if (userId) {
      this.accountService.getSupplementaryCardsByUserId(userId).subscribe({
        next: (response) => {
          this.supplementaryData = response;
        },
        error: (err) => {
          this.supplementaryData = null;
          console.error(err);

          alert(err.error?.message || "User not found");
        },
      });

      return;
    }

    if (cardNo) {
      this.accountService.getSupplementaryCardsByCardNo(cardNo).subscribe({
        next: (response) => {
          this.supplementaryData = response;
        },
        error: (err) => {
          this.supplementaryData = null;
          console.error(err);

          alert(err.error?.message || "Card not found");
        },
      });
    }
  }

  columns = [
    { key: "embossName", label: "Emboss Name" },
    { key: "uci", label: "UCI" },
    { key: "maskedCard", label: "Masked Card" },
    { key: "isAdminUci", label: "Admin UCI" },
  ];

  rows = [
    {
      embossName: "DEV ANAND",
      uci: "DE8522VS",
      maskedCard: "3744XXXXXXXX2263",
      isAdminUci: "No",
    },
    {
      embossName: "MARY SMITH",
      uci: "DE8528KS",
      maskedCard: "3744XXXXXXXX2271",
      isAdminUci: "Yes",
    },
  ];

  userColumns = [
    { key: "userId", label: "User Id" },
    { key: "status", label: "Account Status" },
  ];

  userRows = [
    {
      userId: "Supp15",
      status: "Unlocked",
    },
  ];

  userActions = [
    { id: "lock", label: "Lock User", type: "primary" },
    { id: "delete", label: "Delete User", type: "danger" },
    { id: "offers", label: "Offers", type: "secondary" },
  ];

  onUserAction(event: { action: string; row: any }): void {
    console.log(event);
  }
}
