import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AmexBreadcrumbTrailComponent } from '@ui-components/ui';

@Component({
  selector: 'app-cent-confirm',
  standalone: true,
  imports: [CommonModule, AmexBreadcrumbTrailComponent],
  templateUrl: './cent-confirm.component.html',
  styleUrls: ['./cent-confirm.component.css'],
})
export class CentConfirmComponent implements OnInit {
  cardMembers: any[] = [];
  cardArts:    any[] = [];
  confirmed = false;
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    const state = history.state;
    this.cardMembers = state?.cardMembers || [];
    this.cardArts    = state?.cardArts    || [];
  }
  getArtLabel(artId: string | null): string {
    return this.cardArts.find((a: any) => a.id === artId)?.label || '';
  }
  getArtColor(artId: string | null): string {
    return this.cardArts.find((a: any) => a.id === artId)?.color || '#1a1a1a';
  }
  goBack(): void {
    this.router.navigate(['../personalize'], { relativeTo: this.route });
  }
  onConfirm(): void { this.confirmed = true; }
}