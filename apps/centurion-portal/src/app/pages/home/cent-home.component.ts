import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cent-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cent-home.component.html',
  styleUrls: ['./cent-home.component.css'],
})
export class CentHomeComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  goToPersonalize(): void {
    this.router.navigate(['../personalize'], { relativeTo: this.route });
  }

  goToLoadClient(): void {
    this.router.navigate(['../load-client'], { relativeTo: this.route });
  }
}