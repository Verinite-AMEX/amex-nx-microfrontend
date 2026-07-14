import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { filter } from "rxjs/operators";

import {
  AmexTopNavBarComponent,
  AmexTabBarComponent,
  AmexTabItem,
  AmexSidebarMenuComponent,
  AmexLogoutConfirmationComponent,
} from "@ui-components/ui";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AmexTopNavBarComponent,
    AmexTabBarComponent,
    AmexSidebarMenuComponent,
    AmexLogoutConfirmationComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  showLogout = false;
  activeTab = "offers";
  tabs: AmexTabItem[] = [
    { id: "account", label: "Online Account Services" },
    { id: "supp", label: "Supplementary Access Helper" },
    { id: "offers", label: "Offers" },
    { id: "benefits", label: "Benefits" },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects;
        this.activeTab = url.includes("/benefits") ? "benefits" : "offers";
      });
  }

  onTabClick(id: string): void {
    this.activeTab = id;

    switch (id) {
      case "offers":
        this.router.navigate(["/offers"]);
        break;

      case "benefits":
        this.router.navigate(["/offers/benefits"]);
        break;
    }
  }

  onLogout(): void {
    this.showLogout = false;
    localStorage.clear();
    window.location.reload();
  }
}
