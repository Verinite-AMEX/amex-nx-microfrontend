import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-supp-search",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./supp-search.component.html",
  styleUrls: ["./supp-search.component.css"],
})
export class SuppSearchComponent {
  uciValue = "";
  userIdValue = "";
  searched = false;
  accessGroupId = "11208";
  lockMessage = "";
  uciError = "";
  userIdError = "";

  private masterData = [
    {
      uci: "DE8522VS",
      userId: "Supp15",
      embossName: "DEV ANAND",
      maskedCard: "3744XXXXXXXX2263",
      isAdminUci: false,
      accountStatus: "Unlocked",
      userStatus: "Active",
      mail: "murali.esakkimuthu@americanexpress.com.bh",
      mobileNo: "93 12121212121",
      registrationDate: "Feb 18 2023 12:11:04 PM AST",
      lastLogin: "29/9/2024 1:51:21 PM AST",
    },
    {
      uci: "DE8518HS",
      userId: "Supp16",
      embossName: "DEV ANAND",
      maskedCard: "3744XXXXXXXX2198",
      isAdminUci: false,
      accountStatus: "Unlocked",
      userStatus: "Active",
      mail: "devanand2@americanexpress.com.bh",
      mobileNo: "93 98765432101",
      registrationDate: "Mar 10 2023 09:00:00 AM AST",
      lastLogin: "01/10/2024 10:00:00 AM AST",
    },
    {
      uci: "DE8539VS",
      userId: "Supp17",
      embossName: "LINKE INKE",
      maskedCard: "3744XXXXXXXX2297",
      isAdminUci: false,
      accountStatus: "Locked",
      userStatus: "Active",
      mail: "linkeinke@americanexpress.com.bh",
      mobileNo: "93 11122233301",
      registrationDate: "Apr 05 2023 11:30:00 AM AST",
      lastLogin: "15/9/2024 02:15:00 PM AST",
    },
    {
      uci: "DE8528KS",
      userId: "Supp18",
      embossName: "MARY SMITH",
      maskedCard: "3744XXXXXXXX2271",
      isAdminUci: true,
      accountStatus: "Unlocked",
      userStatus: "Active",
      mail: "marysmith@americanexpress.com.bh",
      mobileNo: "93 55566677701",
      registrationDate: "Jan 20 2023 08:45:00 AM AST",
      lastLogin: "28/9/2024 04:30:00 PM AST",
    },
  ];

  accessGroup: {
    embossName: string;
    uci: string;
    maskedCard: string;
    isAdminUci: boolean;
  }[] = [];
  userInfo: {
    userId: string;
    accountStatus: string;
    userStatus: string;
    mail: string;
    mobileNo: string;
    registrationDate: string;
    lastLogin: string;
  } | null = null;

  constructor(private router: Router) {}
  onSearch(): void {
    this.uciError = "";
    this.userIdError = "";
    const uci = this.uciValue.trim();
    const userId = this.userIdValue.trim();
    if (!uci && !userId) {
      this.uciError = "Please enter a UCI or User ID.";
      this.userIdError = "Please enter a UCI or User ID.";
      return;
    }
    let matched = [...this.masterData];
    if (uci) {
      matched = matched.filter(
        (r) => r.uci.toLowerCase() === uci.toLowerCase(),
      );
      if (matched.length === 0) {
        this.uciError = `UCI "${uci}" not found.`;
        this.searched = false;
        this.accessGroup = [];
        this.userInfo = null;
        return;
      }
    }
    if (userId) {
      matched = matched.filter(
        (r) => r.userId.toLowerCase() === userId.toLowerCase(),
      );
      if (matched.length === 0) {
        this.userIdError = `User ID "${userId}" not found.`;
        this.searched = false;
        this.accessGroup = [];
        this.userInfo = null;
        return;
      }
    }
    if (uci && userId) {
      const both = this.masterData.find(
        (r) =>
          r.uci.toLowerCase() === uci.toLowerCase() &&
          r.userId.toLowerCase() === userId.toLowerCase(),
      );
      if (!both) {
        this.uciError = "UCI and User ID do not match.";
        this.userIdError = "UCI and User ID do not match.";
        this.searched = false;
        this.accessGroup = [];
        this.userInfo = null;
        return;
      }
      matched = [both];
    }

    const record = matched[0];
    this.searched = true;
    this.accessGroup = this.masterData.map((r) => ({
      embossName: r.embossName,
      uci: r.uci,
      maskedCard: r.maskedCard,
      isAdminUci: r.isAdminUci,
    }));
    this.userInfo = {
      userId: record.userId,
      accountStatus: record.accountStatus,
      userStatus: record.userStatus,
      mail: record.mail,
      mobileNo: record.mobileNo,
      registrationDate: record.registrationDate,
      lastLogin: record.lastLogin,
    };
  }
  onReset(): void {
    this.uciValue = "";
    this.userIdValue = "";
    this.searched = false;
    this.accessGroup = [];
    this.userInfo = null;
    this.lockMessage = "";
    this.uciError = "";
    this.userIdError = "";
  }
  onLockUser(): void {
    if (this.userInfo) {
      if (this.userInfo.accountStatus === "Locked") {
        this.userInfo.accountStatus = "Unlocked";
        this.lockMessage = "Account has been unlocked successfully";
      } else {
        this.userInfo.accountStatus = "Locked";
        this.lockMessage = "Account has been locked successfully";
      }
      setTimeout(() => (this.lockMessage = ""), 4000);
    }
  }
  onDeleteUser(): void {
    this.searched = false;
    this.accessGroup = [];
    this.userInfo = null;
    this.lockMessage = "";
  }

  goToOffers(): void {
    window.location.href = "/offers";
  }
  goToBenefits(): void {
    window.location.href = "/offers/benefits";
  }
}
