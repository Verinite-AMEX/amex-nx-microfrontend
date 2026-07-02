import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SecureFormService } from './secure-from.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  constructor(private secureForm: SecureFormService) {}

  ngOnInit(): void {
    this.secureForm.enable();
  }
}