import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import {
  ButtonComponent,
  InputComponent,
  SelectComponent,
  SelectOption,
  CheckboxComponent,
  ImageComponent,
  IconButtonComponent,
  TableComponent,
  TableBodyComponent,
  TableRowComponent,
  TableCellComponent,
} from "@ui-components/ui";

type Step = "search" | "cards" | "issue" | "done";
type IssueView = "select" | "review" | "success";

interface CardInfo {
  cardNumber: string;
  cardType: string;
  status: string;
}
interface WearableColor {
  hex: string;
  label: string;
}
interface WearableProduct {
  name: string;
  type: string;
  colors: WearableColor[];
  icon: string;
}

const API_BASE = `${environment.apiGatewayUrl}/api`;

const MOCK_MEMBERS: Record<string, { name: string; cards: CardInfo[] }> = {
  "12345": {
    name: "John Doe",
    cards: [
      {
        cardNumber: "3744 XXXXXX 9008",
        cardType: "Centurion",
        status: "Active",
      },
      {
        cardNumber: "3782 XXXXXX 0005",
        cardType: "Platinum",
        status: "Active",
      },
      { cardNumber: "3711 XXXXXX 1234", cardType: "Gold", status: "Inactive" },
    ],
  },
  "67890": {
    name: "Jane Smith",
    cards: [
      {
        cardNumber: "3701 XXXXXX 4321",
        cardType: "Platinum",
        status: "Active",
      },
    ],
  },
  "11111": {
    name: "Robert Brown",
    cards: [
      { cardNumber: "3799 XXXXXX 8888", cardType: "Gold", status: "Active" },
    ],
  },
  "22222": {
    name: "Emily Carter",
    cards: [
      {
        cardNumber: "3755 XXXXXX 2200",
        cardType: "Centurion",
        status: "Active",
      },
      {
        cardNumber: "3766 XXXXXX 3311",
        cardType: "Platinum",
        status: "Active",
      },
    ],
  },
  "33333": {
    name: "Michael Chen",
    cards: [
      { cardNumber: "3788 XXXXXX 5500", cardType: "Gold", status: "Active" },
    ],
  },
};

@Component({
  selector: "app-wearables",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    ImageComponent,
    IconButtonComponent,
    TableComponent,
    TableBodyComponent,
    TableRowComponent,
    TableCellComponent,
  ],
  templateUrl: "./wearables.component.html",
  styleUrls: ["./wearables.component.css"],
})
export class WearablesComponent implements OnInit {
  @Input() showPageHeader = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.checkBackendHealth();
  }

  step: Step = "search";
  issueView: IssueView = "select";
  backendStatus: "checking" | "online" | "offline" = "checking";
  usingMockData = false;
  clientCode = "";
  memberName = "";
  cards: CardInfo[] = [];
  selectedCard: CardInfo | null = null;
  submitting = false;
  selectedWearableType = "Watch";
  selectedWearableIndex = 0;
  selectedColorIndex = 0;
  wearableName = "QARR";
  tcAccepted = false;
  issuedDevice: any = null;

  wearableTypes = [
    {
      id: "Watch",
      label: "Watch",
      svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 28C10.477 28 6 23.523 6 18V14C6 8.477 10.477 4 16 4C21.523 4 26 8.477 26 14V18C26 23.523 21.523 28 16 28Z" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M10 14C10 11.239 12.686 9 16 9C19.314 9 22 11.239 22 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
        <path d="M10 18C10 20.761 12.686 23 16 23C19.314 23 22 20.761 22 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
      </svg>`,
    },
    {
      id: "band",
      label: "Band",
      svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="2" width="8" height="9" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
        <rect x="10" y="10" width="12" height="12" rx="1" stroke="currentColor" stroke-width="2" fill="none"/>
        <rect x="12" y="21" width="8" height="9" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
        <line x1="13.5" y1="14.5" x2="18.5" y2="14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="13.5" y1="17.5" x2="18.5" y2="17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`,
    },
    {
      id: "ring",
      label: "Ring",
      svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 22V17C6 11.477 10.477 7 16 7C21.523 7 26 11.477 26 17V22" stroke="currentColor" stroke-width="2" fill="none"/>
        <ellipse cx="16" cy="22" rx="10" ry="4.5" stroke="currentColor" stroke-width="2" fill="none"/>
        <ellipse cx="16" cy="17" rx="4" ry="2" stroke="currentColor" stroke-width="1.5" fill="none"/>
      </svg>`,
    },
  ];

  wearableProducts: Record<string, WearableProduct[]> = {
    Watch: [
      {
        name: "Amex Leather Watch",
        type: "Leather Watch",
        colors: [
          { hex: "#8B5E3C", label: "Brown" },
          { hex: "#1a1a1a", label: "Black" },
        ],
        icon: "⌚",
      },
      {
        name: "Amex Sport Watch",
        type: "Sport Watch",
        colors: [
          { hex: "#1a1a1a", label: "Black" },
          { hex: "#e8e8e8", label: "Silver" },
        ],
        icon: "⌚",
      },
    ],
    band: [
      {
        name: "Amex Sport Band",
        type: "Sport Band",
        colors: [
          { hex: "#1a1a1a", label: "Black" },
          { hex: "#00274c", label: "Navy" },
        ],
        icon: "⌚",
      },
      {
        name: "Amex Silicone Band",
        type: "Silicone Band",
        colors: [
          { hex: "#003087", label: "Navy Blue" },
          { hex: "#8b0000", label: "Red" },
        ],
        icon: "⌚",
      },
    ],
    ring: [
      {
        name: "Amex Ceramic Ring",
        type: "Ceramic Ring",
        colors: [
          { hex: "#e8e8e8", label: "White" },
          { hex: "#1a1a1a", label: "Black" },
        ],
        icon: "💍",
      },
      {
        name: "Amex Titanium Ring",
        type: "Titanium Ring",
        colors: [
          { hex: "#aab0bb", label: "Silver" },
          { hex: "#4a3728", label: "Bronze" },
        ],
        icon: "💍",
      },
    ],
  };

  get currentProducts(): WearableProduct[] {
    return this.wearableProducts[this.selectedWearableType] ?? [];
  }
  get currentProduct(): WearableProduct | null {
    return this.currentProducts[this.selectedWearableIndex] ?? null;
  }

  get currentSelectedColor() {
    const p = this.currentProduct;
    if (!p)
      return {
        hex: "#888",
        label: "",
        highlight: "#aaa",
        shadow: "#555",
        inner: "#666",
      };
    const c = p.colors[this.selectedColorIndex] ?? p.colors[0];
    return {
      ...c,
      highlight: this.lighten(c.hex, 0.3),
      shadow: this.darken(c.hex, 0.35),
      inner: this.darken(c.hex, 0.15),
    };
  }

  private lighten(hex: string, amt: number): string {
    return this.adjustColor(hex, amt);
  }
  private darken(hex: string, amt: number): string {
    return this.adjustColor(hex, -amt);
  }
  private adjustColor(hex: string, amt: number): string {
    const n = parseInt(hex.replace("#", ""), 16);
    const r = Math.min(
      255,
      Math.max(0, Math.round(((n >> 16) & 0xff) + 255 * amt)),
    );
    const g = Math.min(
      255,
      Math.max(0, Math.round(((n >> 8) & 0xff) + 255 * amt)),
    );
    const b = Math.min(255, Math.max(0, Math.round((n & 0xff) + 255 * amt)));
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }

  private checkBackendHealth(): void {
    this.backendStatus = "checking";
    this.http.get<any>(`http://localhost:8080/actuator/health`).subscribe({
      next: () => {
        this.backendStatus = "online";
      },
      error: () => {
        this.backendStatus = "offline";
      },
    });
  }

  onEnterClient(): void {
    if (!this.clientCode.trim()) return;
    this.http
      .get<any>(`${API_BASE}/wearables/client/${this.clientCode.trim()}`)
      .subscribe({
        next: (res) => {
          this.usingMockData = false;
          this.memberName = res.data?.memberName ?? "Unknown Member";
          this.cards = res.data?.cards ?? [];
          this.selectedCard = this.cards[0] ?? null;
          this.step = "cards";
        },
        error: () => {
          this.usingMockData = true;
          const mock = MOCK_MEMBERS[this.clientCode.trim()];
          this.memberName = mock?.name ?? "Unknown Member";
          this.cards = mock?.cards ?? [];
          this.selectedCard = this.cards[0] ?? null;
          this.step = "cards";
        },
      });
  }

  onApply(): void {
    if (!this.selectedCard) return;
    this.selectedWearableType = "Watch";
    this.selectedWearableIndex = 0;
    this.selectedColorIndex = 0;
    this.wearableName = "QARR";
    this.tcAccepted = false;
    this.issueView = "select";
    this.step = "issue";
  }

  selectType(id: string): void {
    this.selectedWearableType = id;
    this.selectedWearableIndex = 0;
    this.selectedColorIndex = 0;
  }

  prevProduct(): void {
    if (this.selectedWearableIndex > 0) {
      this.selectedWearableIndex--;
      this.selectedColorIndex = 0;
    }
  }

  nextProduct(): void {
    if (this.selectedWearableIndex < this.currentProducts.length - 1) {
      this.selectedWearableIndex++;
      this.selectedColorIndex = 0;
    }
  }

  onCreateWearable(): void {
    this.tcAccepted = false;
    this.issueView = "review";
  }

  onSubmit(): void {
    if (!this.tcAccepted || !this.currentProduct || !this.selectedCard) return;
    this.submitting = true;

    const payload = {
      clientCode: this.clientCode,
      selectedCard: this.selectedCard.cardNumber,
      wearableType: this.selectedWearableType,
      colorSelected: this.currentSelectedColor.label,
      wearableName: this.wearableName,
      tcAccepted: true,
    };

    this.http.post<any>(`${API_BASE}/wearables/issue`, payload).subscribe({
      next: (res) => {
        const d = res.data;
        this.issuedDevice = {
          selectedCardUci: this.selectedCard?.cardNumber ?? "",
          wearableUci: d?.serialNo ?? "",
          wearableType: d?.deviceType ?? "",
          colorSelected: this.currentSelectedColor.label,
          wearableName: this.wearableName,
          orderDate: d?.issueDate ?? new Date().toLocaleDateString("en-GB"),
        };
        this.submitting = false;
        this.issueView = "success";
      },
      error: () => {
        this.issuedDevice = {
          selectedCardUci: this.selectedCard?.cardNumber ?? "",
          wearableUci:
            "SN-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
          wearableType: this.currentProduct?.type ?? "",
          colorSelected: this.currentSelectedColor.label,
          wearableName: this.wearableName,
          orderDate: new Date().toLocaleDateString("en-GB"),
        };
        this.submitting = false;
        this.issueView = "success";
      },
    });
  }

  reset(): void {
    this.step = "search";
    this.issueView = "select";
    this.clientCode = "";
    this.memberName = "";
    this.cards = [];
    this.selectedCard = null;
    this.issuedDevice = null;
    this.tcAccepted = false;
    this.submitting = false;
    this.usingMockData = false;
    this.selectedWearableType = "Watch";
    this.selectedWearableIndex = 0;
    this.selectedColorIndex = 0;
    this.wearableName = "QARR";
  }

  // --- Added for ui-select adaptation (ui-select only binds string|number values,
  // the original native <select> bound the whole CardInfo object via [ngValue]) ---
  get cardSelectOptions(): SelectOption[] {
    return this.cards.map((c) => ({
      value: c.cardNumber,
      label: `${c.cardNumber} - ${c.cardType}`,
    }));
  }
  get selectedCardValue(): string {
    return this.selectedCard?.cardNumber ?? "";
  }
  set selectedCardValue(val: string) {
    this.selectedCard = this.cards.find((c) => c.cardNumber === val) ?? null;
  }

  // --- Added: ui-input has no built-in maxlength support, so enforce it here
  // instead of touching the shared primitive. Preserves the original maxlength="20". ---
  onWearableNameChange(val: string): void {
    this.wearableName = (val ?? "").slice(0, 20);
  }
}