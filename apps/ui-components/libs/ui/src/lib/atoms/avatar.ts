import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="avatar avatar-{{size}}" [style.background]="!src ? color : 'transparent'">
      <img *ngIf="src" [src]="src" [attr.alt]="alt || initials" class="avatar-img" />
      <span *ngIf="!src" class="avatar-initials">{{ initials }}</span>
    </div>
  `,
  styles: [`
    .avatar {
      border-radius: 50%; display: inline-flex; align-items: center;
      justify-content: center; overflow: hidden; flex-shrink: 0;
      font-family: Arial, sans-serif; font-weight: 600; color: #fff;
    }
    .avatar-sm { width: 32px; height: 32px; font-size: 12px; }
    .avatar-md { width: 40px; height: 40px; font-size: 14px; }
    .avatar-lg { width: 56px; height: 56px; font-size: 18px; }
    .avatar-xl { width: 72px; height: 72px; font-size: 24px; }
    .avatar-img { width: 100%; height: 100%; object-fit: cover; }
  `],
})
export class AvatarComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `ui-avatar-${++AvatarComponent._idCounter}`;


  @Input() src = '';
  @Input() alt = '';
  @Input() initials = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() color = '#1976d2';
}
