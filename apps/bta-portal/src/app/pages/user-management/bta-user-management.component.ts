import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BtaAuthService } from '../../core/services/auth.service';
import {
  AmexPageHeaderComponent,
  AmexBreadcrumbTrailComponent,
  AmexStatusBadgeComponent,
} from '@ui-components/ui';

interface BtaUser {
  userId: string;
  salutation: string;
  fullName: string;
  jobTitle: string;
  phoneCC: string;
  phone: string;
  mobileCC: string;
  mobile: string;
  email: string;
  creationDate: string;
  accountStatus: string;
  permissions: string;
  country: string;
  travelAgent: string;
  type: string;
  userType: string;
  selectedBtas: string[];
  userRights: string[];
}

const CORPORATION_STORAGE_KEY = 'corporation_users';
const TMC_STORAGE_KEY         = 'tmc_users';
const ALL_BTA_OPTIONS         = ['DNATA (BTA)', 'Emirates (BTA)', 'Etihad (BTA)', 'Air Arabia (BTA)'];
const ALL_USER_RIGHTS         = ['Payment Allocation', 'Audit Trail', 'Memo Statement', 'Reports'];

@Component({
  selector: 'app-bta-user-management',
  imports: [
    CommonModule, FormsModule,
    AmexPageHeaderComponent,
    AmexBreadcrumbTrailComponent,
    AmexStatusBadgeComponent,
  ],
  template: `
    <amex-page-header portalStyle="onls" title="CORPORATION USER MANAGEMENT"></amex-page-header>
    <amex-breadcrumb-trail
      [items]="breadcrumbItems"
      [showBack]="true"
      (backClick)="goBack()">
    </amex-breadcrumb-trail>

    <div class="user-tabs" *ngIf="showCorpTab || showTmcTab">
      <button *ngIf="showCorpTab" class="tab-btn"
        [class.active]="activeTab === 'CORPORATION'"
        (click)="switchTab('CORPORATION')">
        Corporation
      </button>
      <button *ngIf="showTmcTab" class="tab-btn"
        [class.active]="activeTab === 'TMC'"
        (click)="switchTab('TMC')">
        TMC
      </button>
    </div>

    <div class="bta-page">

      <!-- ADD USER — CORPORATION LAYOUT -->
      <div *ngIf="showAddUser && activeTab === 'CORPORATION'" class="bta-panel">
        <div class="bta-panel-hd">New Corporation User Account</div>
        <div class="bta-panel-bd">
          <p class="bta-mandatory-note">All fields marked <span class="req">*</span> are mandatory</p>
          <div *ngIf="formSubmitted && hasErrors()" class="global-error">
            Please correct the highlighted errors before submitting.
          </div>
          <div class="corp-form-list">
            <div class="corp-row">
              <label>Salutation <span class="req">*</span></label>
              <div class="corp-input-wrap">
                <select [(ngModel)]="newUser.salutation" class="corp-select-sm"
                  [class.field-error]="formSubmitted && errors.salutation">
                  <option value="">Select</option>
                  <option>Mr</option><option>Ms</option><option>Mrs</option><option>Dr</option>
                </select>
                <span *ngIf="formSubmitted && errors.salutation" class="error-msg">{{ errors.salutation }}</span>
              </div>
            </div>
            <div class="corp-row">
              <label>Full Name <span class="req">*</span></label>
              <div class="corp-input-wrap">
                <input type="text" [(ngModel)]="newUser.fullName" placeholder="Enter full name"
                  class="corp-input"
                  [class.field-error]="formSubmitted && errors.fullName"
                  (keypress)="allowLettersOnly($event)"/>
                <span *ngIf="formSubmitted && errors.fullName" class="error-msg">{{ errors.fullName }}</span>
              </div>
            </div>
            <div class="corp-row">
              <label>Job Title</label>
              <div class="corp-input-wrap">
                <input type="text" [(ngModel)]="newUser.jobTitle" placeholder="Enter job title" class="corp-input"/>
              </div>
            </div>
            <div class="corp-row">
              <label>Business Phone Number <span class="req">*</span></label>
              <div class="corp-input-wrap">
                <div class="phone-row">
                  <span class="phone-prefix">+</span>
                  <input class="phone-cc" type="text" [(ngModel)]="newUser.phoneCC"
                    [class.field-error]="formSubmitted && errors.phone"
                    (keypress)="allowDigitsOnly($event)" maxlength="4"/>
                  <span class="phone-sep">-</span>
                  <input class="phone-num" type="text" [(ngModel)]="newUser.phone"
                    placeholder="10 digit number"
                    [class.field-error]="formSubmitted && errors.phone"
                    (keypress)="allowDigitsOnly($event)" maxlength="10"/>
                </div>
                <span *ngIf="formSubmitted && errors.phone" class="error-msg">{{ errors.phone }}</span>
              </div>
            </div>
            <div class="corp-row">
              <label>Mobile Number</label>
              <div class="corp-input-wrap">
                <div class="phone-row">
                  <span class="phone-prefix">+</span>
                  <input class="phone-cc" type="text" [(ngModel)]="newUser.mobileCC"
                    (keypress)="allowDigitsOnly($event)" maxlength="4"/>
                  <span class="phone-sep">-</span>
                  <input class="phone-num" type="text" [(ngModel)]="newUser.mobile"
                    placeholder="Optional"
                    [class.field-error]="formSubmitted && errors.mobile"
                    (keypress)="allowDigitsOnly($event)" maxlength="10"/>
                </div>
                <span *ngIf="formSubmitted && errors.mobile" class="error-msg">{{ errors.mobile }}</span>
              </div>
            </div>
            <div class="corp-row">
              <label>Email Address <span class="req">*</span></label>
              <div class="corp-input-wrap">
                <input type="email" [(ngModel)]="newUser.email" placeholder="user@example.com"
                  class="corp-input" [class.field-error]="formSubmitted && errors.email"/>
                <span *ngIf="formSubmitted && errors.email" class="error-msg">{{ errors.email }}</span>
              </div>
            </div>
            <div class="corp-row">
              <label>Confirm Email Address <span class="req">*</span></label>
              <div class="corp-input-wrap">
                <input type="email" [(ngModel)]="newUser.emailConfirm" placeholder="Re-enter email"
                  class="corp-input" [class.field-error]="formSubmitted && errors.emailConfirm"/>
                <span *ngIf="formSubmitted && errors.emailConfirm" class="error-msg">{{ errors.emailConfirm }}</span>
              </div>
            </div>
            <div class="corp-row">
              <label>Country <span class="req">*</span></label>
              <div class="corp-input-wrap">
                <select [(ngModel)]="newUser.country" class="corp-input"
                  [class.field-error]="formSubmitted && errors.country">
                  <option value="">Select a Country</option>
                  <option>Bahrain</option><option>UAE</option>
                  <option>Saudi Arabia</option><option>Kuwait</option>
                  <option>Qatar</option><option>Oman</option>
                </select>
                <span *ngIf="formSubmitted && errors.country" class="error-msg">{{ errors.country }}</span>
              </div>
            </div>
            <div class="corp-row">
              <label>User Type <span class="req">*</span></label>
              <div class="corp-input-wrap">
                <div class="radio-group">
                  <label class="radio-label"><input type="radio" [(ngModel)]="newUser.userType" value="admin"/> Administrator</label>
                  <label class="radio-label"><input type="radio" [(ngModel)]="newUser.userType" value="user"/> User</label>
                </div>
                <span *ngIf="formSubmitted && errors.userType" class="error-msg">{{ errors.userType }}</span>
              </div>
            </div>
            <div class="corp-row">
              <label>Select Basic Account Numbers for this Administrator <span class="req">*</span></label>
              <div class="corp-input-wrap">
                <select multiple [(ngModel)]="newUser.selectedBtas" class="corp-multi-select"
                  [class.field-error]="formSubmitted && errors.selectedBtas">
                  <option *ngFor="let a of allBtaOptions" [value]="a">{{ a }}</option>
                </select>
                <span *ngIf="formSubmitted && errors.selectedBtas" class="error-msg">{{ errors.selectedBtas }}</span>
              </div>
            </div>
            <div class="corp-row">
              <label>User ID <span class="req">*</span></label>
              <div class="corp-input-wrap">
                <input type="text" [(ngModel)]="newUser.userId" placeholder="Unique user ID"
                  class="corp-input" [class.field-error]="formSubmitted && errors.userId"/>
                <span *ngIf="formSubmitted && errors.userId" class="error-msg">{{ errors.userId }}</span>
              </div>
            </div>
          </div>
          <div class="corp-actions">
            <button class="bta-btn bta-btn-secondary" (click)="cancelAddUser()">Cancel</button>
            <button class="bta-btn bta-btn-primary" (click)="submitNewUser()">Submit</button>
          </div>
          <div *ngIf="successMsg" class="success-msg">{{ successMsg }}</div>
        </div>
      </div>

      <!-- ADD USER — TMC LAYOUT -->
<div *ngIf="showAddUser && activeTab === 'TMC'" class="bta-panel">
  <div class="bta-panel-hd">New TMC User Account</div>
  <div class="bta-panel-bd">
    <p class="bta-mandatory-note">All fields marked <span class="req">*</span> are mandatory</p>
    <div *ngIf="formSubmitted && hasErrors()" class="global-error">
      Please correct the highlighted errors before submitting.
    </div>

    <div class="corp-form-list">

      <div class="corp-row">
        <label>Salutation <span class="req">*</span></label>
        <div class="corp-input-wrap">
          <select [(ngModel)]="newUser.salutation" class="corp-select-sm"
            [class.field-error]="formSubmitted && errors.salutation">
            <option value="">Select</option>
            <option>Mr</option><option>Ms</option><option>Mrs</option><option>Dr</option>
          </select>
          <span *ngIf="formSubmitted && errors.salutation" class="error-msg">{{ errors.salutation }}</span>
        </div>
      </div>

      <div class="corp-row">
        <label>Full Name <span class="req">*</span></label>
        <div class="corp-input-wrap">
          <input type="text" [(ngModel)]="newUser.fullName" placeholder="Enter full name"
            class="corp-input"
            [class.field-error]="formSubmitted && errors.fullName"
            (keypress)="allowLettersOnly($event)"/>
          <span *ngIf="formSubmitted && errors.fullName" class="error-msg">{{ errors.fullName }}</span>
        </div>
      </div>

      <div class="corp-row">
        <label>Job Title</label>
        <div class="corp-input-wrap">
          <input type="text" [(ngModel)]="newUser.jobTitle" placeholder="Enter job title"
            class="corp-input"/>
        </div>
      </div>

      <div class="corp-row">
        <label>Business Phone Number <span class="req">*</span></label>
        <div class="corp-input-wrap">
          <div class="phone-row">
            <span class="phone-prefix">+</span>
            <input class="phone-cc" type="text" [(ngModel)]="newUser.phoneCC"
              [class.field-error]="formSubmitted && errors.phone"
              (keypress)="allowDigitsOnly($event)" maxlength="4"/>
            <span class="phone-sep">-</span>
            <input class="phone-num" type="text" [(ngModel)]="newUser.phone"
              placeholder="10 digit number"
              [class.field-error]="formSubmitted && errors.phone"
              (keypress)="allowDigitsOnly($event)" maxlength="10"/>
          </div>
          <span *ngIf="formSubmitted && errors.phone" class="error-msg">{{ errors.phone }}</span>
        </div>
      </div>

      <div class="corp-row">
        <label>Mobile Number</label>
        <div class="corp-input-wrap">
          <div class="phone-row">
            <span class="phone-prefix">+</span>
            <input class="phone-cc" type="text" [(ngModel)]="newUser.mobileCC"
              (keypress)="allowDigitsOnly($event)" maxlength="4"/>
            <span class="phone-sep">-</span>
            <input class="phone-num" type="text" [(ngModel)]="newUser.mobile"
              placeholder="Optional"
              [class.field-error]="formSubmitted && errors.mobile"
              (keypress)="allowDigitsOnly($event)" maxlength="10"/>
          </div>
          <span *ngIf="formSubmitted && errors.mobile" class="error-msg">{{ errors.mobile }}</span>
        </div>
      </div>

      <div class="corp-row">
        <label>Email Address <span class="req">*</span></label>
        <div class="corp-input-wrap">
          <input type="email" [(ngModel)]="newUser.email" placeholder="user@example.com"
            class="corp-input"
            [class.field-error]="formSubmitted && errors.email"/>
          <span *ngIf="formSubmitted && errors.email" class="error-msg">{{ errors.email }}</span>
        </div>
      </div>

      <div class="corp-row">
        <label>Confirm Email Address <span class="req">*</span></label>
        <div class="corp-input-wrap">
          <input type="email" [(ngModel)]="newUser.emailConfirm" placeholder="Re-enter email"
            class="corp-input"
            [class.field-error]="formSubmitted && errors.emailConfirm"/>
          <span *ngIf="formSubmitted && errors.emailConfirm" class="error-msg">{{ errors.emailConfirm }}</span>
        </div>
      </div>

      <div class="corp-row">
        <label>Country <span class="req">*</span></label>
        <div class="corp-input-wrap">
          <select [(ngModel)]="newUser.country" class="corp-input"
            [class.field-error]="formSubmitted && errors.country">
            <option value="">Select a Country</option>
            <option>Bahrain</option><option>UAE</option>
            <option>Saudi Arabia</option><option>Kuwait</option>
            <option>Qatar</option><option>Oman</option>
          </select>
          <span *ngIf="formSubmitted && errors.country" class="error-msg">{{ errors.country }}</span>
        </div>
      </div>

      <div class="corp-row">
        <label>User Type <span class="req">*</span></label>
        <div class="corp-input-wrap">
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" [(ngModel)]="newUser.userType" value="admin"/> Administrator
            </label>
            <label class="radio-label">
              <input type="radio" [(ngModel)]="newUser.userType" value="user"/> User
            </label>
          </div>
          <span *ngIf="formSubmitted && errors.userType" class="error-msg">{{ errors.userType }}</span>
        </div>
      </div>
      <div class="corp-row">
              <label>Select Basic Account Numbers for this Administrator <span class="req">*</span></label>
              <div class="corp-input-wrap">
                <select multiple [(ngModel)]="newUser.selectedBtas" class="corp-multi-select"
                  [class.field-error]="formSubmitted && errors.selectedBtas">
                  <option *ngFor="let a of allBtaOptions" [value]="a">{{ a }}</option>
                </select>
                <span *ngIf="formSubmitted && errors.selectedBtas" class="error-msg">{{ errors.selectedBtas }}</span>
              </div>
            </div>
      <div class="corp-row">
        <label>User ID <span class="req">*</span></label>
        <div class="corp-input-wrap">
          <input type="text" [(ngModel)]="newUser.userId" placeholder="Unique user ID"
            class="corp-input"
            [class.field-error]="formSubmitted && errors.userId"/>
          <span *ngIf="formSubmitted && errors.userId" class="error-msg">{{ errors.userId }}</span>
        </div>
      </div>

    </div><!-- /corp-form-list -->

    <div class="corp-actions">
      <button class="bta-btn bta-btn-secondary" (click)="cancelAddUser()">Cancel</button>
      <button class="bta-btn bta-btn-primary" (click)="submitNewUser()">Submit</button>
    </div>
    <div *ngIf="successMsg" class="success-msg">{{ successMsg }}</div>
  </div>
</div>
      <!-- SELECT USER TO EDIT -->
      <div *ngIf="showUserPicker" class="bta-panel">
        <div class="bta-panel-hd">Select User to Edit</div>
        <div class="bta-panel-bd">
          <p class="bta-mandatory-note">Select the user account you want to edit.</p>
          <div *ngIf="pickerSubmitted && !selectedPickerUserId" class="global-error">
            Please select a user to continue.
          </div>
          <table class="bta-table">
            <thead>
              <tr>
                <th></th><th>User ID</th><th>Full Name</th>
                <th>Email Address</th><th>Account Status</th><th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let u of users"
                [class.row-selected]="selectedPickerUserId === u.userId"
                (click)="selectedPickerUserId = u.userId">
                <td>
                  <input type="radio" name="pickerUser" [value]="u.userId" [(ngModel)]="selectedPickerUserId"/>
                </td>
                <td>{{ u.userId }}</td>
                <td>{{ u.fullName }}</td>
                <td>{{ u.email }}</td>
                <td>
                  <amex-status-badge [status]="getStatus(u.accountStatus)" [label]="u.accountStatus">
                  </amex-status-badge>
                </td>
                <td>{{ u.type }}</td>
              </tr>
            </tbody>
          </table>
          <div class="bta-actions">
            <button class="bta-btn bta-btn-secondary" (click)="cancelUserPicker()">Cancel</button>
            <button class="bta-btn bta-btn-primary" (click)="confirmUserPicker()">Edit Selected User</button>
          </div>
        </div>
      </div>

      <!-- EDIT MY DETAILS FORM -->
      <div *ngIf="showEditMyDetails && editUser" class="bta-panel">
        <div class="bta-panel-hd">Edit {{ activeTab }} User Account</div>
        <div class="bta-panel-bd">
          <p class="bta-mandatory-note">All fields marked <span class="req">*</span> are mandatory</p>
          <div *ngIf="editSubmitted && hasEditErrors()" class="global-error">
            Please correct the highlighted errors before saving.
          </div>
          <div class="bta-form-list">
            <div class="bta-field-row-edit">
              <label>User ID</label>
              <span class="ro-value">{{ editUser.userId }}</span>
            </div>
            <div class="bta-field-row-edit">
              <label>Salutation</label>
              <span class="ro-value">{{ editUser.salutation }}</span>
            </div>
            <div class="bta-field-row-edit">
              <label>Full Name</label>
              <span class="ro-value">{{ editUser.fullName }}</span>
            </div>
            <div class="bta-field-row-edit">
              <label>Date Account Created</label>
              <span class="ro-value">{{ editUser.creationDate }}</span>
            </div>
            <div class="bta-field-row-edit">
              <label>Job Title</label>
              <input type="text" [(ngModel)]="editUser.jobTitle" placeholder="Enter job title" class="bta-input-wide"/>
            </div>
            <div class="bta-field-row-edit">
              <label>Business Phone Number <span class="req">*</span></label>
              <div>
                <div class="phone-row">
                  <span class="phone-prefix">+</span>
                  <input class="phone-cc" type="text" [(ngModel)]="editUser.phoneCC"
                    [class.field-error]="editSubmitted && editErrors.phone"
                    (keypress)="allowDigitsOnly($event)" maxlength="4"/>
                  <span class="phone-sep">-</span>
                  <input class="phone-num" type="text" [(ngModel)]="editUser.phone"
                    placeholder="10 digit number"
                    [class.field-error]="editSubmitted && editErrors.phone"
                    (keypress)="allowDigitsOnly($event)" maxlength="10"/>
                </div>
                <span *ngIf="editSubmitted && editErrors.phone" class="error-msg">{{ editErrors.phone }}</span>
              </div>
            </div>
            <div class="bta-field-row-edit">
              <label>Mobile Number</label>
              <div>
                <div class="phone-row">
                  <span class="phone-prefix">+</span>
                  <input class="phone-cc" type="text" [(ngModel)]="editUser.mobileCC"
                    (keypress)="allowDigitsOnly($event)" maxlength="4"/>
                  <span class="phone-sep">-</span>
                  <input class="phone-num" type="text" [(ngModel)]="editUser.mobile"
                    placeholder="Optional"
                    [class.field-error]="editSubmitted && editErrors.mobile"
                    (keypress)="allowDigitsOnly($event)" maxlength="10"/>
                </div>
                <span *ngIf="editSubmitted && editErrors.mobile" class="error-msg">{{ editErrors.mobile }}</span>
              </div>
            </div>
            <div class="bta-field-row-edit">
              <label>Email Address <span class="req">*</span></label>
              <div>
                <input type="email" [(ngModel)]="editUser.email" placeholder="user@example.com"
                  class="bta-input-wide" [class.field-error]="editSubmitted && editErrors.email"/>
                <span *ngIf="editSubmitted && editErrors.email" class="error-msg">{{ editErrors.email }}</span>
              </div>
            </div>
            <div class="bta-field-row-edit">
              <label>Confirm Email Address <span class="req">*</span></label>
              <div>
                <input type="email" [(ngModel)]="editUser.emailConfirm" placeholder="Re-enter email"
                  class="bta-input-wide" [class.field-error]="editSubmitted && editErrors.emailConfirm"/>
                <span *ngIf="editSubmitted && editErrors.emailConfirm" class="error-msg">{{ editErrors.emailConfirm }}</span>
              </div>
            </div>
            <div class="bta-field-row-edit">
              <label>Country <span class="req">*</span></label>
              <div>
                <select [(ngModel)]="editUser.country" class="bta-input-wide"
                  [class.field-error]="editSubmitted && editErrors.country">
                  <option value="">Select a Country</option>
                  <option>Bahrain</option><option>UAE</option>
                  <option>Saudi Arabia</option><option>Kuwait</option>
                  <option>Qatar</option><option>Oman</option>
                </select>
                <span *ngIf="editSubmitted && editErrors.country" class="error-msg">{{ editErrors.country }}</span>
              </div>
            </div>
            <div class="bta-field-row-edit">
              <label>User Type <span class="req">*</span></label>
              <div class="radio-group">
                <label class="radio-label"><input type="radio" [(ngModel)]="editUser.userType" value="admin"/> Administrator</label>
                <label class="radio-label"><input type="radio" [(ngModel)]="editUser.userType" value="user"/> User</label>
              </div>
            </div>
            <div class="bta-field-row-edit">
              <label>Select BTAs for this user <span class="req">*</span></label>
              <div>
                <select multiple class="bta-multi-select"
                  [class.field-error]="editSubmitted && editErrors.selectedBtas"
                  (change)="onBtaChange($event)">
                  <option *ngFor="let bta of allBtaOptions" [value]="bta"
                    [selected]="editUser.selectedBtas.includes(bta)">{{ bta }}</option>
                </select>
                <span *ngIf="editSubmitted && editErrors.selectedBtas" class="error-msg">{{ editErrors.selectedBtas }}</span>
              </div>
            </div>
            <div class="bta-field-row-edit">
              <label>Select user rights <span class="req">*</span></label>
              <div class="checkbox-group">
                <label *ngFor="let right of allUserRights" class="checkbox-label">
                  <input type="checkbox"
                    [checked]="editUser.userRights.includes(right)"
                    (change)="onRightChange(right, $event)"/> {{ right }}
                </label>
                <span *ngIf="editSubmitted && editErrors.userRights" class="error-msg">{{ editErrors.userRights }}</span>
              </div>
            </div>
            <div class="bta-field-row-edit">
              <label>Account Status <span class="req">*</span></label>
              <div>
                <select [(ngModel)]="editUser.accountStatus" class="bta-input-medium"
                  [class.field-error]="editSubmitted && editErrors.accountStatus">
                  <option value="">Select</option>
                  <option>Active</option><option>Suspended</option>
                  <option>Cancelled</option><option>Pending</option>
                </select>
                <span *ngIf="editSubmitted && editErrors.accountStatus" class="error-msg">{{ editErrors.accountStatus }}</span>
              </div>
            </div>
          </div>
          <div class="bta-actions-edit">
            <button class="bta-btn bta-btn-reset" (click)="resetPassword()">Reset Password</button>
            <div class="bta-actions-right">
              <button class="bta-btn bta-btn-secondary" (click)="cancelEditMyDetails()">Cancel</button>
              <button class="bta-btn bta-btn-primary" (click)="saveEditMyDetails()">Save Changes</button>
            </div>
          </div>
          <div *ngIf="editSuccessMsg" class="success-msg">{{ editSuccessMsg }}</div>
        </div>
      </div>

      <!-- EDIT USER FORM (from table row Edit link) -->
      <div *ngIf="showEditUser && editUser && !showEditMyDetails" class="bta-panel">
        <div class="bta-panel-hd">Edit My Account Details</div>
        <div class="bta-panel-bd">
          <p class="bta-mandatory-note">All fields marked <span class="req">*</span> are mandatory</p>
          <div *ngIf="editSubmitted && hasEditErrors()" class="global-error">
            Please correct the highlighted errors before saving.
          </div>
          <div class="bta-form-list">
            <div class="bta-field-row-edit">
              <label>User ID</label>
              <span class="ro-value">{{ editUser.userId }}</span>
            </div>
            <div class="bta-field-row-edit">
              <label>Salutation</label>
              <span class="ro-value">{{ editUser.salutation }}</span>
            </div>
            <div class="bta-field-row-edit">
              <label>Full Name</label>
              <span class="ro-value">{{ editUser.fullName }}</span>
            </div>
            <div class="bta-field-row-edit">
              <label>Date Account Created</label>
              <span class="ro-value">{{ editUser.creationDate }}</span>
            </div>
            <div class="bta-field-row-edit">
              <label>Job Title</label>
              <input type="text" [(ngModel)]="editUser.jobTitle" placeholder="Enter job title" class="bta-input-wide"/>
            </div>
            <div class="bta-field-row-edit">
              <label>Business Phone Number <span class="req">*</span></label>
              <div>
                <div class="phone-row">
                  <input class="phone-cc" type="text" [(ngModel)]="editUser.phoneCC" placeholder="+"
                    [class.field-error]="editSubmitted && editErrors.phone"
                    (keypress)="allowDigitsOnly($event)" maxlength="4"/>
                  <input class="phone-num" type="text" [(ngModel)]="editUser.phone"
                    placeholder="10 digit number"
                    [class.field-error]="editSubmitted && editErrors.phone"
                    (keypress)="allowDigitsOnly($event)" maxlength="10"/>
                </div>
                <span *ngIf="editSubmitted && editErrors.phone" class="error-msg">{{ editErrors.phone }}</span>
              </div>
            </div>
            <div class="bta-field-row-edit">
              <label>Mobile Number</label>
              <div>
                <div class="phone-row">
                  <input class="phone-cc" type="text" [(ngModel)]="editUser.mobileCC" placeholder="+"
                    (keypress)="allowDigitsOnly($event)" maxlength="4"/>
                  <input class="phone-num" type="text" [(ngModel)]="editUser.mobile" placeholder="Optional"
                    [class.field-error]="editSubmitted && editErrors.mobile"
                    (keypress)="allowDigitsOnly($event)" maxlength="10"/>
                </div>
                <span *ngIf="editSubmitted && editErrors.mobile" class="error-msg">{{ editErrors.mobile }}</span>
              </div>
            </div>
            <div class="bta-field-row-edit">
              <label>Email Address <span class="req">*</span></label>
              <div>
                <input type="email" [(ngModel)]="editUser.email" placeholder="user@example.com"
                  class="bta-input-wide" [class.field-error]="editSubmitted && editErrors.email"/>
                <span *ngIf="editSubmitted && editErrors.email" class="error-msg">{{ editErrors.email }}</span>
              </div>
            </div>
            <div class="bta-field-row-edit">
              <label>Confirm Email Address <span class="req">*</span></label>
              <div>
                <input type="email" [(ngModel)]="editUser.emailConfirm" placeholder="Re-enter email"
                  class="bta-input-wide" [class.field-error]="editSubmitted && editErrors.emailConfirm"/>
                <span *ngIf="editSubmitted && editErrors.emailConfirm" class="error-msg">{{ editErrors.emailConfirm }}</span>
              </div>
            </div>
            <div class="bta-field-row-edit">
              <label>Country <span class="req">*</span></label>
              <div>
                <select [(ngModel)]="editUser.country" class="bta-input-wide"
                  [class.field-error]="editSubmitted && editErrors.country">
                  <option value="">Select a Country</option>
                  <option>Bahrain</option><option>UAE</option>
                  <option>Saudi Arabia</option><option>Kuwait</option>
                  <option>Qatar</option><option>Oman</option>
                </select>
                <span *ngIf="editSubmitted && editErrors.country" class="error-msg">{{ editErrors.country }}</span>
              </div>
            </div>
          </div>
          <div class="bta-actions">
            <button class="bta-btn bta-btn-secondary" (click)="cancelEditUser()">Cancel</button>
            <button class="bta-btn bta-btn-primary" (click)="saveEditUser()">Save Changes</button>
          </div>
          <div *ngIf="editSuccessMsg" class="success-msg">{{ editSuccessMsg }}</div>
        </div>
      </div>

      <!-- USER LIST -->
      <div *ngIf="!showAddUser && !showEditUser && !showEditMyDetails && !showUserPicker" class="bta-panel">
        <div class="bta-panel-hd">List of Users</div>
        <div class="bta-panel-bd">
          <div *ngIf="users.length === 0" class="no-records">
            No users found. Click "Create New User" to add one.
          </div>
          <table *ngIf="users.length > 0" class="bta-table">
            <thead>
              <tr>
                <th>User ID</th><th>Full Name</th><th>Email Address</th>
                <th>Account Creation Date</th><th>Account Status</th>
                <th>Country</th><th>Travel Agent</th><th>Type</th><th></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let u of users">
                <td>{{ u.userId }}</td>
                <td>{{ u.fullName }}</td>
                <td>{{ u.email }}</td>
                <td>{{ u.creationDate }}</td>
                <td>
                  <amex-status-badge [status]="getStatus(u.accountStatus)" [label]="u.accountStatus">
                  </amex-status-badge>
                </td>
                <td>{{ u.country }}</td>
                <td>{{ u.travelAgent }}</td>
                <td>{{ u.type }}</td>
                <td><a class="bta-link" (click)="openEditUser(u)">Edit</a></td>
              </tr>
            </tbody>
          </table>
          <div class="bta-actions-row">
            <button class="bta-btn bta-btn-secondary"
              [disabled]="users.length === 0"
              [class.bta-btn-disabled]="users.length === 0"
              (click)="openEditMyDetails()">Edit My Details</button>
            <button class="bta-btn bta-btn-primary" (click)="openAddUser()">Create New User</button>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .bta-page            { padding:0 16px 24px; background:#fff; }
    .bta-panel           { border:1px solid #b8d0e8; border-radius:2px; overflow:hidden; margin-top:12px; }
    .bta-panel-hd        { background:#cfe2f3; border-bottom:1px solid #b8d0e8; padding:8px 14px; font-size:13px; font-weight:bold; color:#1e3a6e; }
    .bta-panel-bd        { padding:16px; }
    .bta-mandatory-note  { font-size:12px; color:#555; margin-bottom:14px; }
    .req                 { color:#cc0000; }

    .corp-form-list      { display:flex; flex-direction:column; gap:8px; }
    .corp-row            { display:flex; align-items:flex-start; }
    .corp-row > label    { font-size:12px; font-weight:bold; color:#333; min-width:230px; max-width:230px; padding-top:6px; padding-right:8px; line-height:1.4; }
    .corp-input-wrap     { display:flex; flex-direction:column; gap:3px; flex:1; }
    .corp-input          { border:1px solid #aaa; padding:4px 8px; font-size:12px; font-family:Arial,sans-serif; max-width:260px; }
    .corp-select-sm      { border:1px solid #aaa; padding:4px 8px; font-size:12px; font-family:Arial,sans-serif; width:120px; }
    .corp-multi-select   { border:1px solid #aaa; padding:4px 6px; font-size:12px; font-family:Arial,sans-serif; width:260px; height:70px; }
    .corp-actions        { display:flex; justify-content:space-between; margin-top:16px; }

    .bta-form-grid       { display:grid; grid-template-columns:1fr 1fr; gap:14px 28px; }
    .bta-field           { display:flex; flex-direction:column; gap:4px; }
    .bta-field label     { font-size:12px; color:#333; font-weight:bold; }
    .bta-field input,
    .bta-field select    { border:1px solid #aaa; padding:5px 10px; font-size:12px; font-family:Arial,sans-serif; border-radius:2px; }

    .bta-form-list       { display:flex; flex-direction:column; gap:10px; margin-bottom:8px; }
    .bta-field-row-edit  { display:flex; align-items:flex-start; gap:12px; flex-wrap:wrap; font-size:12px; }
    .bta-field-row-edit > label { font-size:12px; color:#333; min-width:200px; padding-top:5px; font-weight:bold; }
    .bta-input-wide      { border:1px solid #aaa; padding:4px 8px; font-size:12px; font-family:Arial,sans-serif; min-width:280px; }
    .bta-input-medium    { border:1px solid #aaa; padding:4px 8px; font-size:12px; font-family:Arial,sans-serif; min-width:200px; }
    .bta-multi-select    { border:1px solid #aaa; padding:4px 8px; font-size:12px; font-family:Arial,sans-serif; min-width:280px; height:80px; }
    .checkbox-group      { display:flex; flex-direction:column; gap:5px; }
    .checkbox-label      { display:flex !important; align-items:center; gap:6px; font-size:12px; cursor:pointer; font-weight:normal !important; min-width:unset !important; }
    .ro-value            { color:#333; font-size:12px; padding-top:5px; }

    .field-error         { border-color:#cc0000 !important; }
    .error-msg           { color:#cc0000; font-size:11px; display:block; margin-top:2px; }
    .global-error        { background:#fff0f0; border:1px solid #cc0000; padding:8px 12px; font-size:12px; color:#cc0000; margin-bottom:12px; border-radius:2px; }
    .success-msg         { margin-top:10px; padding:8px 12px; background:#e6f9f0; color:#1a7a4a; border:1px solid #b7e4ce; font-size:12px; border-radius:2px; }
    .no-records          { font-size:12px; color:#555; padding:16px 0; text-align:center; }

    .phone-row           { display:flex; gap:4px; align-items:center; }
    .phone-cc            { width:50px !important; border:1px solid #aaa; padding:4px 8px; font-size:12px; font-family:Arial,sans-serif; }
    .phone-num           { width:180px !important; border:1px solid #aaa; padding:4px 8px; font-size:12px; font-family:Arial,sans-serif; }
    .phone-prefix        { font-size:12px; color:#333; }
    .phone-sep           { font-size:12px; color:#333; padding:0 2px; }

    .radio-group         { display:flex; flex-direction:column; gap:4px; }
    .radio-label         { display:flex !important; align-items:center; gap:6px; font-size:12px !important; cursor:pointer; font-weight:normal !important; min-width:unset !important; }

    .bta-actions         { display:flex; gap:10px; justify-content:flex-end; margin-top:16px; }
    .bta-actions-row     { display:flex; justify-content:space-between; margin-top:14px; }
    .bta-actions-edit    { display:flex; justify-content:space-between; align-items:center; margin-top:16px; }
    .bta-actions-right   { display:flex; gap:10px; }

    .bta-btn             { padding:5px 16px; font-size:12px; font-family:Arial,sans-serif; cursor:pointer; border-radius:2px; }
    .bta-btn-primary      { background:#1e3a6e; color:#fff; border:1px solid #1e3a6e; }
    .bta-btn-primary:hover { background:#2d5499; }
    .bta-btn-secondary    { background:#fff; color:#333; border:1px solid #aaa; }
    .bta-btn-secondary:hover { background:#f5f5f5; }
    .bta-btn-reset        { background:#fff; color:#1e3a6e; border:1px solid #1e3a6e; }
    .bta-btn-reset:hover  { background:#f0f4fc; }
    .bta-btn-disabled     { opacity:0.5; cursor:not-allowed !important; }

    .bta-table           { width:100%; border-collapse:collapse; font-size:12px; }
    .bta-table th        { background:#cfe2f3; border:1px solid #b8d0e8; padding:7px 10px; text-align:left; font-weight:bold; color:#1e3a6e; white-space:nowrap; }
    .bta-table td        { border:1px solid #dde4ed; padding:7px 10px; vertical-align:top; }
    .bta-table tr:hover td { background:#f5f9ff; }
    .row-selected td     { background:#ddeeff !important; }
    .bta-link            { color:#006fcf; cursor:pointer; text-decoration:underline; font-size:12px; }

    .user-tabs           { display:flex; margin:12px 16px 0; }
    .tab-btn             { padding:8px 20px; border:1px solid #8ea9c9; background:#e8eef7; cursor:pointer; font-size:12px; font-weight:bold; color:#1e3a6e; }
    .tab-btn:first-child { border-right:none; }
    .tab-btn.active      { background:#1e3a6e; color:#fff; }
    .tab-btn:hover       { background:#d9e5f5; }
    .tab-btn.active:hover { background:#1e3a6e; }
  `]
})
export class BtaUserManagementComponent implements OnInit {

    constructor(
    private auth: BtaAuthService
  ) {}

  private setActiveTab(): void {
    if (this.showCorpTab && !this.showTmcTab) {
      // corp.admin, corp.sub.admin → Corporation only
      this.activeTab = 'CORPORATION';
    } else if (!this.showCorpTab && this.showTmcTab) {
      // ta.admin, ta.sub.admin → TMC only
      this.activeTab = 'TMC';
    } else {
      // amex.internal.admin → both tabs, default to Corporation
      this.activeTab = 'BOTH';
    }
  }

  get showCorpTab(): boolean {
    return this.auth.isAemeAdmin() || this.auth.isCorpAdmin();
  }

  get showTmcTab(): boolean {
    return this.auth.isAemeAdmin() || this.auth.isTaAdmin();
  }

  breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'User Management', url: '/user-management' },
  ];

  showAddUser       = false;
  showEditUser      = false;
  showEditMyDetails = false;
  showUserPicker    = false;

  allBtaOptions = ALL_BTA_OPTIONS;
  allUserRights = ALL_USER_RIGHTS;

  formSubmitted = false;
  successMsg    = '';
  errors: Record<string, string> = {};

  newUser = {
    salutation: '', fullName: '', jobTitle: '',
    phoneCC: '', phone: '', mobileCC: '', mobile: '',
    email: '', emailConfirm: '', country: '', userType: '', userId: '',
    selectedBtas: [] as string[],
  };

  editUser: (BtaUser & { emailConfirm: string }) | null = null;
  editSubmitted  = false;
  editSuccessMsg = '';
  editErrors: Record<string, string> = {};

  selectedPickerUserId = '';
  pickerSubmitted      = false;

  // FIX 1: default changed to 'TMC' to avoid CORPORATION content
  // rendering before ngOnInit sets the correct tab for TMC-only roles
  activeTab: 'CORPORATION' | 'TMC' | 'BOTH' = 'TMC';

  corporationUsers: BtaUser[] = [];
  tmcUsers: BtaUser[]         = [];

  get users(): BtaUser[] {
    return this.activeTab === 'CORPORATION' ? this.corporationUsers : this.activeTab === 'BOTH' ? [...this.corporationUsers, ...this.tmcUsers] : this.tmcUsers;
  }

  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // FIX 2: all three role scenarios handled explicitly
  ngOnInit(): void {
    this.setActiveTab();
    this.loadUsers();
  }

  private loadUsers(): void {
    try {
      const c = localStorage.getItem(CORPORATION_STORAGE_KEY);
      const t = localStorage.getItem(TMC_STORAGE_KEY);
      this.corporationUsers = c ? JSON.parse(c) : [];
      this.tmcUsers         = t ? JSON.parse(t) : [];
    } catch {
      this.corporationUsers = [];
      this.tmcUsers         = [];
    }
  }

  private saveUsers(): void {
    try { localStorage.setItem(CORPORATION_STORAGE_KEY, JSON.stringify(this.corporationUsers)); } catch {}
    try { localStorage.setItem(TMC_STORAGE_KEY,         JSON.stringify(this.tmcUsers));         } catch {}
  }

  allowLettersOnly(event: KeyboardEvent): boolean {
    if (!/^[a-zA-Z\s]$/.test(event.key)) { event.preventDefault(); return false; }
    return true;
  }
  allowDigitsOnly(event: KeyboardEvent): boolean {
    if (!/^[0-9]$/.test(event.key)) { event.preventDefault(); return false; }
    return true;
  }

  validateNewUser(): boolean {
    this.errors = {};

    if (!this.newUser.salutation)
      this.errors['salutation'] = 'Salutation is required.';

    if (!this.newUser.fullName.trim())
      this.errors['fullName'] = 'Full Name is required.';
    else if (!/^[a-zA-Z\s]+$/.test(this.newUser.fullName.trim()))
      this.errors['fullName'] = 'Full Name must contain letters only.';
    else if (this.newUser.fullName.trim().length < 2)
      this.errors['fullName'] = 'Full Name must be at least 2 characters.';

    if (!this.newUser.phone.trim())
      this.errors['phone'] = 'Business Phone Number is required.';
    else if (this.newUser.phone.trim().length !== 10)
      this.errors['phone'] = 'Phone Number must be exactly 10 digits.';
    else if (this.users.some(u => u.phone === this.newUser.phone.trim()))
      this.errors['phone'] = 'This Phone Number is already registered.';

    if (this.newUser.mobile?.trim() && this.newUser.mobile.trim().length !== 10)
      this.errors['mobile'] = 'Mobile Number must be exactly 10 digits.';

    if (!this.newUser.email.trim())
      this.errors['email'] = 'Email Address is required.';
    else if (!this.emailRegex.test(this.newUser.email.trim()))
      this.errors['email'] = 'Enter a valid email address.';
    else if (this.users.some(u => u.email.toLowerCase() === this.newUser.email.trim().toLowerCase()))
      this.errors['email'] = 'This Email Address is already registered.';

    if (!this.newUser.emailConfirm.trim())
      this.errors['emailConfirm'] = 'Please confirm your Email Address.';
    else if (this.newUser.emailConfirm !== this.newUser.email)
      this.errors['emailConfirm'] = 'Email addresses do not match.';

    if (!this.newUser.country)
      this.errors['country'] = 'Country is required.';

    if (!this.newUser.userType)
      this.errors['userType'] = 'User Type is required.';

    if (this.activeTab === 'CORPORATION' && (!this.newUser.selectedBtas || this.newUser.selectedBtas.length === 0))
      this.errors['selectedBtas'] = 'Please select at least one BTA account.';

    if (!this.newUser.userId.trim())
      this.errors['userId'] = 'User ID is required.';
    else if (this.newUser.userId.trim().length < 4)
      this.errors['userId'] = 'User ID must be at least 4 characters.';
    else if (this.users.some(u => u.userId.toLowerCase() === this.newUser.userId.trim().toLowerCase()))
      this.errors['userId'] = 'User ID already exists.';

    return Object.keys(this.errors).length === 0;
  }

  hasErrors(): boolean { return Object.keys(this.errors).length > 0; }

  openAddUser()   { this.resetForm(); this.showAddUser = true; }
  cancelAddUser() { this.resetForm(); this.showAddUser = false; }

  resetForm() {
    this.formSubmitted = false; this.successMsg = ''; this.errors = {};
    this.newUser = {
      salutation:'', fullName:'', jobTitle:'', phoneCC:'', phone:'',
      mobileCC:'', mobile:'', email:'', emailConfirm:'', country:'',
      userType:'', userId:'', selectedBtas:[],
    };
  }

  submitNewUser() {
    this.formSubmitted = true;
    if (!this.validateNewUser()) return;

    const user: BtaUser = {
      userId:        this.newUser.userId.trim(),
      salutation:    this.newUser.salutation,
      fullName:      this.newUser.fullName.trim(),
      jobTitle:      this.newUser.jobTitle.trim(),
      phoneCC:       this.newUser.phoneCC.trim(),
      phone:         this.newUser.phone.trim(),
      mobileCC:      this.newUser.mobileCC.trim(),
      mobile:        this.newUser.mobile.trim(),
      email:         this.newUser.email.trim(),
      creationDate:  new Date().toLocaleDateString('en-GB'),
      accountStatus: 'Active',
      permissions:   this.newUser.userType === 'admin' ? 'All' : 'Memo Statement',
      country:       this.newUser.country,
      travelAgent:   'DNATA (BTA)',
      type:          this.newUser.userType === 'admin' ? 'Administrator' : 'User',
      userType:      this.newUser.userType,
      selectedBtas:  this.newUser.selectedBtas || [],
      userRights:    [],
    };

    this.users.push(user);
    this.saveUsers();
    this.successMsg = `User "${user.userId}" created successfully.`;
    setTimeout(() => { this.resetForm(); this.showAddUser = false; }, 1500);
  }

  openEditUser(u: BtaUser) {
    this.editUser = { ...u, emailConfirm: u.email };
    this.editSubmitted = false; this.editSuccessMsg = ''; this.editErrors = {};
    this.showEditUser = true; this.showEditMyDetails = false;
  }

  validateEdit(): boolean {
    this.editErrors = {};
    if (!this.editUser!.phone.trim())
      this.editErrors['phone'] = 'Business Phone Number is required.';
    else if (this.editUser!.phone.trim().length !== 10)
      this.editErrors['phone'] = 'Phone Number must be exactly 10 digits.';
    if (this.editUser!.mobile?.trim() && this.editUser!.mobile.trim().length !== 10)
      this.editErrors['mobile'] = 'Mobile Number must be exactly 10 digits.';
    if (!this.editUser!.email.trim())
      this.editErrors['email'] = 'Email Address is required.';
    else if (!this.emailRegex.test(this.editUser!.email.trim()))
      this.editErrors['email'] = 'Enter a valid email address.';
    if (!this.editUser!.emailConfirm.trim())
      this.editErrors['emailConfirm'] = 'Please confirm your Email Address.';
    else if (this.editUser!.emailConfirm !== this.editUser!.email)
      this.editErrors['emailConfirm'] = 'Email addresses do not match.';
    if (!this.editUser!.country)
      this.editErrors['country'] = 'Country is required.';
    return Object.keys(this.editErrors).length === 0;
  }

  hasEditErrors(): boolean { return Object.keys(this.editErrors).length > 0; }

  saveEditUser() {
    this.editSubmitted = true;
    if (!this.validateEdit()) return;
    const index = this.users.findIndex(u => u.userId === this.editUser!.userId);
    if (index !== -1) {
      const { emailConfirm, ...updated } = this.editUser!;
      this.users[index] = updated;
      this.saveUsers();
    }
    this.editSuccessMsg = `User "${this.editUser!.userId}" updated successfully.`;
    setTimeout(() => {
      this.showEditUser = false; this.editUser = null;
      this.editSubmitted = false; this.editSuccessMsg = ''; this.editErrors = {};
    }, 1500);
  }

  cancelEditUser() {
    this.showEditUser = false; this.editUser = null;
    this.editSubmitted = false; this.editSuccessMsg = ''; this.editErrors = {};
  }

  openEditMyDetails() {
    if (this.users.length === 0) return;
    this.selectedPickerUserId = ''; this.pickerSubmitted = false;
    this.showUserPicker = true;
  }

  confirmUserPicker() {
    this.pickerSubmitted = true;
    if (!this.selectedPickerUserId) return;
    const user = this.users.find(u => u.userId === this.selectedPickerUserId);
    if (!user) return;
    this.editUser = { ...user, emailConfirm: user.email };
    this.editSubmitted = false; this.editSuccessMsg = ''; this.editErrors = {};
    this.showUserPicker = false; this.showEditMyDetails = true; this.showEditUser = false;
  }

  cancelUserPicker() {
    this.showUserPicker = false; this.selectedPickerUserId = ''; this.pickerSubmitted = false;
  }

  validateEditMyDetails(): boolean {
    this.editErrors = {};
    if (!this.editUser!.phone.trim())
      this.editErrors['phone'] = 'Business Phone Number is required.';
    else if (this.editUser!.phone.trim().length !== 10)
      this.editErrors['phone'] = 'Phone Number must be exactly 10 digits.';
    if (this.editUser!.mobile?.trim() && this.editUser!.mobile.trim().length !== 10)
      this.editErrors['mobile'] = 'Mobile Number must be exactly 10 digits.';
    if (!this.editUser!.email.trim())
      this.editErrors['email'] = 'Email Address is required.';
    else if (!this.emailRegex.test(this.editUser!.email.trim()))
      this.editErrors['email'] = 'Enter a valid email address.';
    if (!this.editUser!.emailConfirm.trim())
      this.editErrors['emailConfirm'] = 'Please confirm your Email Address.';
    else if (this.editUser!.emailConfirm !== this.editUser!.email)
      this.editErrors['emailConfirm'] = 'Email addresses do not match.';
    if (!this.editUser!.country)
      this.editErrors['country'] = 'Country is required.';
    if (!this.editUser!.accountStatus)
      this.editErrors['accountStatus'] = 'Account Status is required.';
    if (!this.editUser!.selectedBtas?.length)
      this.editErrors['selectedBtas'] = 'Please select at least one BTA.';
    if (!this.editUser!.userRights?.length)
      this.editErrors['userRights'] = 'Please select at least one user right.';
    return Object.keys(this.editErrors).length === 0;
  }

  saveEditMyDetails() {
    this.editSubmitted = true;
    if (!this.validateEditMyDetails()) return;
    this.editUser!.permissions = this.editUser!.userType === 'admin' ? 'All' : this.editUser!.userRights.join(', ');
    this.editUser!.type        = this.editUser!.userType === 'admin' ? 'Administrator' : 'User';
    const index = this.users.findIndex(u => u.userId === this.editUser!.userId);
    if (index !== -1) {
      const { emailConfirm, ...updated } = this.editUser!;
      this.users[index] = updated;
      this.saveUsers();
    }
    this.editSuccessMsg = `User "${this.editUser!.userId}" updated successfully.`;
    setTimeout(() => {
      this.showEditMyDetails = false; this.editUser = null;
      this.editSubmitted = false; this.editSuccessMsg = ''; this.editErrors = {};
    }, 1500);
  }

  cancelEditMyDetails() {
    this.showEditMyDetails = false; this.editUser = null;
    this.editSubmitted = false; this.editSuccessMsg = ''; this.editErrors = {};
  }

  resetPassword() { alert(`Password reset email sent to ${this.editUser?.email}`); }

  onBtaChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const selected = Array.from(select.options).filter(o => o.selected).map(o => o.value);
    if (this.editUser) this.editUser.selectedBtas = selected;
  }

  onRightChange(right: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (!this.editUser) return;
    const rights = [...(this.editUser.userRights || [])];
    if (checked && !rights.includes(right)) rights.push(right);
    else if (!checked) rights.splice(rights.indexOf(right), 1);
    this.editUser.userRights = rights;
  }

  getStatus(s: string): any {
    const map: Record<string, string> = {
      'Active':'active','Cancelled':'expired','Suspended':'locked','Pending':'pending',
    };
    return map[s] || 'inactive';
  }

  goBack() {
    this.showAddUser = false; this.showEditUser = false;
    this.showEditMyDetails = false; this.showUserPicker = false;
    this.editUser = null;
  }

  // FIX 3: guard prevents switching to a tab the role can't access
  switchTab(tab: 'CORPORATION' | 'TMC'): void {
    if (tab === 'CORPORATION' && !this.showCorpTab) return;
    if (tab === 'TMC' && !this.showTmcTab) return;

    this.activeTab = tab;
    this.showAddUser = false; this.showEditUser = false;
    this.showEditMyDetails = false; this.showUserPicker = false;
    this.editUser = null;
    this.resetForm();
  }
}