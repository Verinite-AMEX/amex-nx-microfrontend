import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionService } from '@amex/shared-services';
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
  templateUrl: './bta-user-management.component.html',
  styleUrls: ['./bta-user-management.component.css'],
})

export class BtaUserManagementComponent implements OnInit {

    constructor(
    private auth: SessionService
  ) {}

  private setActiveTab(): void {
    if (this.showCorpTab && !this.showTmcTab) {
      this.activeTab = 'CORPORATION';
    } else if (!this.showCorpTab && this.showTmcTab) {
      this.activeTab = 'TMC';
    } else {
      this.activeTab = 'BOTH';
    }
  }

  get showCorpTab(): boolean {
    return this.auth.hasRole('ROLE_AEME_INTERNAL_ADMIN') || this.auth.hasAnyRole(['ROLE_CORP_MASTER_ADMIN', 'ROLE_CORP_SUB_ADMIN']);
  }

  get showTmcTab(): boolean {
    return this.auth.hasRole('ROLE_AEME_INTERNAL_ADMIN') || this.auth.hasAnyRole(['ROLE_TA_MASTER_ADMIN', 'ROLE_TA_SUB_ADMIN']);
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
  activeTab: 'CORPORATION' | 'TMC' | 'BOTH' = 'TMC';

  corporationUsers: BtaUser[] = [];
  tmcUsers: BtaUser[]         = [];

  get users(): BtaUser[] {
    return this.activeTab === 'CORPORATION' ? this.corporationUsers : this.activeTab === 'BOTH' ? [...this.corporationUsers, ...this.tmcUsers] : this.tmcUsers;
  }

  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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