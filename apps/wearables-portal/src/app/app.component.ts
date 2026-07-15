import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SecureFormService } from './core/services/secure-form.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {

  constructor(private secureForm: SecureFormService) {}
  ngOnInit(): void {
    this.secureForm.enable();
  }
}