import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  NavigationEnd,
  Router,
  RouterOutlet
} from '@angular/router';

import { OmsHomeComponent } from '../pages/home/oms-home.component';
import { OmsHeaderComponent } from '../pages/header/oms-header.component';

import { OmsMerchantPanelComponent } from '../pages/merchant-panel/oms-merchant-panel.component';

import { OmsMerchantDataFormComponent } from '../pages/merchant-data-form/oms-merchant-data-form.component';

import { OmsContactInformationComponent } from '../pages/contact-information/oms-contact-information.component';

import { OmsReportFormatComponent } from '../pages/report-format/oms-report-format.component';

import { OmsVatRegistrationComponent } from '../pages/vat-registration/oms-vat-registration.component';

import { OmsSidebarComponent } from '../pages/sidebar/oms-sidebar.component';

import { OmsTaxInvoiceDeliveryComponent } from '../pages/tax-invoice-delivery/oms-tax-invoice-delivery.component';

import { OmsUploadCertificateComponent } from '../pages/upload-certificate/oms-upload-certificate.component';

import { OmsTaxInvoiceReportComponent } from '../pages/tax-invoice-report/oms-tax-invoice-report.component';

import { OmsTermsAndConditionsComponent } from '../pages/terms-and-conditions/oms-terms-and-conditions.component';

import { OmsChangePasswordComponent } from '../pages/change-password/oms-change-password.component';

import { OmsCustomizedReportComponent } from '../pages/customized-reports/oms-customized-report.component';

import { OmsCustomizedReportsFormComponent } from '../pages/customized-reports-form/oms-customized-reports-form.component';

import { OmsMonthsDropdownFilterComponent } from '../pages/months-dropdown-filter/oms-months-dropdown-filter.component';

import { OmsSettlementSubmissionsTableComponent } from '../pages/settlement-submissions-table/oms-settlement-submissions-table.component';

import { OmsSubUserAdminTableComponent } from '../pages/sub-user-admin-table/oms-sub-user-admin-table.component';

import { OmsUserManagementTableComponent } from '../pages/user-management-table/oms-user-management-table.component';

import { OmsCreateEditUserFormComponent } from '../pages/create-edit-user-form/oms-create-edit-user-form.component';

import { OmsEditUserFormComponent } from '../pages/edit-user-form/oms-edit-user-form.component';

import { NewOutletPortalComponent } from '../pages/new-outlet/new-outlet-portal.component';

import { OmsNewOutletApplicationFormComponent } from '../pages/new-outlet-application-form/oms-new-outlet-application-form.component';

import {
  OmsUserManagementService
} from '../services/oms-user-management.service';

import { MrmUserManagementService } from '../services/mrm-user-management.service';
import { SubUserManagementService } from '../services/sub-user-management.service';
import { OmsSettlementSubmissionService } from '../services/oms-settlement-submission.service';
import { SecureFormService } from '../services/secure-form.service'; 
import { AmexPageShellComponent } from '@ui-components/ui';

import { OmsAuthService } from '../services/auth.service';
import { filter, Subscription } from 'rxjs';

interface NavItem { id: string; label: string; }

interface AmexTabItem {
    id: string;
    label: string;
}

@Component({
  selector: 'app-nx-welcome',

  standalone: true,

  imports: [
    CommonModule,

    OmsHeaderComponent,
    OmsHomeComponent,

    OmsMerchantPanelComponent,
    OmsMerchantDataFormComponent,

    OmsContactInformationComponent,
    OmsReportFormatComponent,

    OmsVatRegistrationComponent,
    OmsSidebarComponent,

    OmsTaxInvoiceDeliveryComponent,
    OmsUploadCertificateComponent,

    OmsTaxInvoiceReportComponent,
    OmsTermsAndConditionsComponent,

    OmsChangePasswordComponent,
    OmsCustomizedReportComponent,

    OmsCustomizedReportsFormComponent,
    OmsMonthsDropdownFilterComponent,

    OmsSettlementSubmissionsTableComponent,
    OmsSubUserAdminTableComponent,

    OmsUserManagementTableComponent,
    OmsCreateEditUserFormComponent,

    OmsEditUserFormComponent,
    NewOutletPortalComponent,

    OmsNewOutletApplicationFormComponent,

    RouterOutlet,

    AmexPageComponent
  ],

  templateUrl: './remote-entry.html',

  styles: [`

    .layout {

      display: flex;

      width: 100%;

      min-height: calc(100vh - 120px);

      align-items: flex-start;
    }

    .sidebar {

      width: 200px;

      min-width: 200px;

      border-right: 1px solid #dcdcdc;

      background: #f8f8f8;
    }

    .content {

      flex: 1;

      padding: 24px;

      display: flex;

      justify-content: flex-start;

      align-items: flex-start;

      overflow-x: auto;
    }

    .popup-overlay {

      position: fixed;

      top: 0;

      left: 0;

      width: 100%;

      height: 100%;

      background: rgba(0, 0, 0, 0.5);

      display: flex;

      justify-content: center;

      align-items: center;

      z-index: 9999;
    }

    .popup-content {

      width: 700px;

      max-width: 90%;

      background: white;

      padding: 24px;

      border-radius: 8px;

      position: relative;

      max-height: 90vh;

      overflow-y: auto;
    }

    .close-btn {

      position: absolute;

      top: 12px;

      right: 12px;

      border: none;

      background: transparent;

      font-size: 20px;

      cursor: pointer;
    }

  `],

  encapsulation: ViewEncapsulation.None,
})

export class NxWelcome
  implements OnInit {

  showSidebar = false;

  selectedSidebarMenu = '';

  editPopupTitle = '';

  showTaxInvoiceDelivery = false;

  showUploadCertificate = false;

  showTaxInvoiceReport = false;

  showTermsConditions = false;

  showChangePassword = false;

  showCustomizedReport = false;

  showSettlementSubmission = false;

  showSubUserAdmin = false;

  showCreateSubUser = false;

  showMrmUserAdmin = false;

  showOmsUsers = false;

  showCreateOmsUser = false;

  showCreateMrmUser = false;

  showEditUserPopup = false;

  selectedEditUser: any = null;

  showNewOutletPortal = false;

  showNewOutletApplicationForm = false;

  omsUserRows: any[] = [];

  selectedOmsUser: any = null;

  mrmUserRows: any[] = [];

  selectedMrmUser: any = null;

  subUserRows: any[] = [];

  editFormRender = true;

  editFormVersion = 0;

  settlementRows: any[] = [];

  settlementLoading = false;

  showSettlementTable = false;

  private routeSub!: Subscription;

  navItems: NavItem[] = [];
  activeId = '';
  // tabs: AmexTabItem[] = [{ id: 'oms', label: 'OMS Portal' }];


  constructor(
    private secureForm: SecureFormService,
    private omsUserService: OmsUserManagementService,
    private mrmUserService: MrmUserManagementService,
    private cdr: ChangeDetectorRef,
    private subUserService: SubUserManagementService,
    private settlementService: OmsSettlementSubmissionService,
    private auth: OmsAuthService,
    private router: Router,

  ) {}

  // INIT
  ngOnInit() {
    // this.secureForm.enable(); 
    // this.loadOmsUsers();
    // this.loadMrmUsers();
    // this.loadSubUsers();

    this.secureForm.enable(); 
    this.updateNav(this.router.url);

    this.routeSub = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      this.updateNav(e.urlAfterRedirects ?? e.url);
    });

    this.secureForm.enable(); 
    this.loadOmsUsers();
    this.loadMrmUsers();
    this.loadSubUsers();
  }

  private updateNav(url: string): void {
    if (url.includes('/oms/login') || !this.auth.isLoggedIn()) {
      this.navItems = [];
      this.activeId = '';
      return;
    }

    this.navItems = this.buildNav();
    const seg = url.split('/').filter(Boolean).pop() ?? '';
    this.activeId = this.navItems.find(i => i.id === seg)?.id
      ?? this.navItems[0]?.id
      ?? '';
  }

  private buildNav(): NavItem[] {
    if (this.auth.isMerchant()) {
      return [
        { id: 'settlement',   label: 'Settlement & Submission'    },
        
      ];
    }
    if (this.auth.isOmsAdmin()) {
      return [
        { id: 'settlement',   label: 'Settlement & Submission'    },
        
      ];
    }
    if (this.auth.isOmsSubUser()) {
      return [
        { id: 'settlement',   label: 'Settlement & Submission'    },
      
      ];
    }
    if (this.auth.isMrmUser()) {
      return [
        { id: 'settlement',   label: 'Settlement & Submission'    },
      
      ];
    }
    if (this.auth.isOmsVatUser()) {
      return [
        { id: 'settlement',   label: 'Settlement & Submission'    },
      
      ];
    }
    return [];
  }

  onNavClick(id: string): void {
    this.activeId = id;
    this.router.navigate(['/bta', id]);
  }

  onLogout(): void {
  // OLD:
  // this.auth.clearSession();
  // this.router.navigate(['/bta/login']);

  // NEW — delegates to Login-Logout-auth-app
  this.auth.logout();
}

  // LOAD OMS USERS
  loadOmsUsers() {

    this.omsUserService
      .getUsers()
      .subscribe(users => {

        this.omsUserRows =
          users;

        console.log(
          'OMS Users:',
          users
        );
      });
  }

  loadMrmUsers() {

  this.mrmUserService
    .getUsers()
    .subscribe(users => {

      this.mrmUserRows =
        users;

      console.log(
        'MRM Users:',
        users
      );
    });
}

loadSubUsers() {

  this.subUserService
    .getUsers()
    .subscribe(users => {

      this.subUserRows =
        users;

      console.log(
        'SUB USERS:',
        users
      );
    });
}

// LOAD INITIAL TABLE
loadSettlementRows() {

  this.settlementService
    .getRows()
    .subscribe((rows: any[]) => {

      this.settlementRows =
        rows;
    });
}

// FILTER TABLE
onSettlementSubmit(
  months: number
) {

  console.log(
    'FILTER MONTHS:',
    months
  );

  // HIDE TABLE
  this.showSettlementTable =
    false;

  // SHOW LOADING
  this.settlementLoading =
    true;

  // FORCE UI REFRESH
  this.cdr.detectChanges();

  this.settlementService
    .filterRows(
      months
    )
    .subscribe((rows: any[]) => {

      console.log(
        'FILTERED ROWS:',
        rows
      );

      this.settlementRows =
        [...rows];

      // STOP LOADING
      this.settlementLoading =
        false;

      // SHOW TABLE
      this.showSettlementTable =
        true;

      // FORCE UI REFRESH
      this.cdr.detectChanges();
    });
}

  // TAB CLICK
  onTabChanged(tabId: any) {

    console.log(
      'Selected Tab:',
      tabId
    );

    // RESET
    this.showSidebar = false;

    this.showTermsConditions = false;

    this.showChangePassword = false;

    this.showCustomizedReport = false;

    this.showSettlementSubmission = false;

    this.showSubUserAdmin = false;

    this.showCreateSubUser = false;

    this.showMrmUserAdmin = false;

    this.showOmsUsers = false;

    this.showCreateOmsUser = false;

    this.showCreateMrmUser = false;

    this.showNewOutletPortal = false;

    this.showNewOutletApplicationForm = false;

    this.showTaxInvoiceDelivery = false;

    this.showUploadCertificate = false;

    this.showTaxInvoiceReport = false;

    this.selectedSidebarMenu = '';

    // CLOSE POPUP ON TAB CHANGE
    this.closeEditPopup();

    // MERCHANT ACCOUNT
    if (tabId === 'merchantaccount') {

      this.showSidebar = true;
    }

    // TERMS
    if (tabId === 'termsandconditions') {

      this.showTermsConditions = true;
    }

    // PASSWORD
    if (tabId === 'password') {

      this.showChangePassword = true;
    }

    // CUSTOMIZED REPORT
    if (tabId === 'customizedreports') {

      this.showCustomizedReport = true;
    }

    // SETTLEMENT
    if (tabId === 'settlement') {

      this.showSettlementSubmission = true;
    }

    // SUB USER
    if (tabId === 'subuseradministration') {

      this.showSubUserAdmin = true;
    }

    // MRM USER
    if (tabId === 'mrmusers') {

      this.showMrmUserAdmin = true;
    }

    // OMS USER
    if (tabId === 'omsusers') {

      this.showOmsUsers = true;
    }

    // NEW OUTLET
    if (tabId === 'addnewoutlet') {

      this.showNewOutletPortal = true;
    }
  }

  // SIDEBAR
  onMenuChanged(menuId: string) {

    console.log(
      'Sidebar Menu:',
      menuId
    );

    this.selectedSidebarMenu =
      menuId;
  }

  // TAX DELIVERY
  onTaxInvoiceDeliveryClicked() {

    this.showTaxInvoiceDelivery = true;
  }

  onBackToVatRegistration() {

    this.showTaxInvoiceDelivery = false;
  }

  // UPLOAD CERTIFICATE
  onUploadCertificateClicked() {

    this.showUploadCertificate = true;
  }

  onBackToVatRegistrationFromUpload() {

    this.showUploadCertificate = false;
  }

  // TAX REPORT
  onDownloadTaxInvoiceClicked() {

    this.showTaxInvoiceReport = true;
  }

  onBackFromTaxInvoiceReport() {

    this.showTaxInvoiceReport = false;
  }

  // CREATE OMS USER
  onCreateOmsUser() {

    this.showOmsUsers = false;

    this.showCreateOmsUser = true;
  }

  onBackToOmsUsers() {

    this.showCreateOmsUser = false;

    this.showOmsUsers = true;
  }

  // SAVE OMS USER
  saveOmsUser(
  event: any
) {

  console.log(
    'FORM EVENT:',
    event
  );

  const newUser = {

    // TABLE FIELD
    userId:
      event.username,

    // TABLE FIELD
    userName:
      event.name,

    // TABLE FIELD
    emailAddress:
      event.email,

    creationDate:
      new Date()
        .toLocaleDateString(),

    status:
      'Active',

    merchantNumber:

      event.merchantAccess?.[0] ||

      '9275640241'
  };

  console.log(
    'NEW USER:',
    newUser
  );

  this.omsUserService
    .addUser(
      newUser
    );

  // CLOSE FORM
  this.showCreateOmsUser =
    false;

  // SHOW TABLE
  this.showOmsUsers =
    true;
}

onDeleteOmsUser(
  user: any
) {

  console.log(
    'Deleting User:',
    user
  );

  this.omsUserService
    .deleteUser(
      user.userId
    );
}

onUpdateOmsUser(
  event: any
) {

  console.log(
    'UPDATED EVENT:',
    event
  );

  const updatedUser = {

    userId:

      event.username ||

      this.selectedEditUser.userId,

    userName:

      event.name ||

      this.selectedEditUser.userName,

    emailAddress:

      event.email ||

      this.selectedEditUser.emailAddress,

    creationDate:

      this.selectedEditUser
        .creationDate,

    status:
      'Active',

    merchantNumber:

      event.merchantAccess?.[0] ||

      this.selectedEditUser
        .merchantNumber
  };

  console.log(
    'FINAL UPDATED USER:',
    updatedUser
  );

  this.omsUserService
    .updateUser(
      updatedUser
    );

  // CLOSE POPUP
  this.showEditUserPopup =
    false;
}

  // CREATE MRM USER
  onCreateMrmUser() {

    this.showMrmUserAdmin = false;

    this.showCreateMrmUser = true;
  }

  onBackToMrmUsers() {

    this.showCreateMrmUser = false;

    this.showMrmUserAdmin = true;
  }

  // EDIT MRM USER
  // EDIT MRM USER
onEditMrmUser(
  user: any
) {

  console.log(
    'MRM EDIT USER:',
    user
  );

  // RESET POPUP
  this.showEditUserPopup =
    false;

  // CLEAR OLD DATA
  this.selectedEditUser =
    null;

  // FORCE REFRESH
  this.cdr.detectChanges();

  // SET NEW DATA
  this.selectedEditUser = {

    ...user
  };

  this.editPopupTitle =
    'EDIT MRM USER';

  // OPEN POPUP
  this.showEditUserPopup =
    true;
}

  // EDIT OMS USER
onEditOmsUser(
  user: any
) {

  console.log(
    'OMS EDIT USER:',
    user
  );

  // RESET POPUP
  this.showEditUserPopup =
    false;

  // CLEAR OLD DATA
  this.selectedEditUser =
    null;

  // FORCE REFRESH
  this.cdr.detectChanges();

  // SET NEW DATA
  this.selectedEditUser = {

    ...user
  };

  this.editPopupTitle =
    'EDIT OMS USER';

  // OPEN POPUP
  this.showEditUserPopup =
    true;
}

  // CLOSE POPUP
  closeEditPopup() {

  this.showEditUserPopup =
    false;

  this.selectedEditUser =
    null;

  this.editPopupTitle =
    '';
}

  // SUB USER
  onCreateSubUser() {

    this.showSubUserAdmin = false;

    this.showCreateSubUser = true;
  }

  onEditSubUser(
  user: any
) {

  console.log(
    'EDIT SUB USER:',
    user
  );

  this.showEditUserPopup =
    false;

  this.selectedEditUser =
    null;

  this.cdr.detectChanges();

  setTimeout(() => {

    // IMPORTANT:
    // KEEP ORIGINAL ID
    this.selectedEditUser = {

      id:
        user.id,

      userId:
        user.email ||

        '',

      userName:
        user.name ||

        '',

      emailAddress:
        user.email ||

        '',

      role:
        user.role ||

        'Sub User',

      merchantNumber:
        ''
    };

    console.log(
      'FINAL EDIT DATA:',
      this.selectedEditUser
    );

    this.editPopupTitle =
      'EDIT SUB USER';

    this.showEditUserPopup =
        true;

    this.cdr.detectChanges();

  }, 0);
}

onUpdateSubUser(
  event: any
) {

  console.log(
    'UPDATED EVENT:',
    event
  );

  const updatedUser = {

    id:
      this.selectedEditUser.id,

    // IMPORTANT:
    // TABLE EXPECTS name
    name:

      event.userName ||

      this.selectedEditUser.userName,

    // IMPORTANT:
    // TABLE EXPECTS email
    email:

      event.emailAddress ||

      this.selectedEditUser.emailAddress,

    role:
      'Sub User',

    status:
      'Active'
  };

  console.log(
    'FINAL UPDATED USER:',
    updatedUser
  );

  this.subUserService
    .updateUser(
      updatedUser
    );

  this.showEditUserPopup =
    false;
}

onDeleteSubUser(
  user: any
) {

  console.log(
    'DELETE SUB USER:',
    user
  );

  if (!user?.id) {

    return;
  }

  this.subUserService
    .deleteUser(
      user.id
    );
}

  // NEW OUTLET
  onCreateNewApplication() {

    this.showNewOutletPortal = false;

    this.showNewOutletApplicationForm = true;
  }

  saveMrmUser(
  event: any
) {

  const newUser = {

    id:
      Date.now(),

    userId:
      event.username,

    userName:
      event.name,

    emailAddress:
      event.email,

    creationDate:
      new Date()
        .toLocaleDateString(),

    status:
      'Active'
  };

  this.mrmUserService
    .addUser(
      newUser
    );

  this.showCreateMrmUser =
    false;

  this.showMrmUserAdmin =
    true;
}

onDeleteMrmUser(
  user: any
) {

  this.mrmUserService
    .deleteUser(
      user.id
    );
}

onUpdateMrmUser(
  event: any
) {

  const updatedUser = {

    id:
      this.selectedEditUser.id,

    userId:

      event.username ||

      this.selectedEditUser.userId,

    userName:

      event.name ||

      this.selectedEditUser.userName,

    emailAddress:

      event.email ||

      this.selectedEditUser.emailAddress,

    creationDate:

      this.selectedEditUser
        .creationDate,

    status:
      'Active'
  };

  this.mrmUserService
    .updateUser(
      updatedUser
    );

  this.showEditUserPopup =
    false;
}

saveSubUser(
  event: any
) {

  const newUser = {

    id:
      Date.now(),

    name:
      event.name,

    email:
      event.email,

    role:
      'Sub User',

    status:
      'Active'
  };

  this.subUserService
    .addUser(
      newUser
    );

  this.showCreateSubUser =
    false;

  this.showSubUserAdmin =
    true;
}

onBackToNewOutletPortal() {

  this.showNewOutletApplicationForm =
    false;

  this.showNewOutletPortal =
    true;
}


}