import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';
import { AmexAddUserFormComponent } from '@vn-core-ui-components/ui';
import { AmexEditUserFormComponent } from '@vn-core-ui-components/ui';
import { AmexEditMyDetailsFormComponent } from '@vn-core-ui-components/ui';
import { AmexContactInformationFormComponent } from '@vn-core-ui-components/ui';
import { AmexCountryMasterFormComponent } from '@vn-core-ui-components/ui';
import { AmexCurrencyMasterFormComponent } from '@vn-core-ui-components/ui';
import { AmexSOCROCEntryFormComponent } from '@vn-core-ui-components/ui';
import { AmexMerchantDataFormComponent } from '@vn-core-ui-components/ui';
import { AmexAddDeleteMerchantPanelComponent } from '@vn-core-ui-components/ui';
import { AmexPaymentAllocationFormComponent } from '@vn-core-ui-components/ui';
import { AmexReportFormatFormComponent } from '@vn-core-ui-components/ui';
import { AmexVATRegistrationFormComponent } from '@vn-core-ui-components/ui';
import { AmexUploadCertificatePanelComponent } from '@vn-core-ui-components/ui';
import { AmexTaxInvoiceDeliveryFormComponent } from '@vn-core-ui-components/ui';
import { AmexCustomizedReportsFormComponent } from '@vn-core-ui-components/ui';
import { AmexAlgeriaPaymentFormComponent } from '@vn-core-ui-components/ui';
import { AmexWearableIssuanceFormComponent } from '@vn-core-ui-components/ui';
import { AmexCenturionCardArtSelectorComponent } from '@vn-core-ui-components/ui';
import { AmexFileUploadFormComponent } from '@vn-core-ui-components/ui';
import { AmexVATInvoiceSearchFormComponent } from '@vn-core-ui-components/ui';
import { AmexUAEFTSStatementRequestFormComponent } from '@vn-core-ui-components/ui';
import { AmexNewOutletApplicationFormComponent } from '@vn-core-ui-components/ui';
import { AmexMRMCreateEditUserFormComponent } from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-amex-forms-page',
  standalone: true,
  imports: [
    CommonModule, ShowcasePageComponent, VariantSectionComponent,
    AmexAddUserFormComponent, AmexEditUserFormComponent, AmexEditMyDetailsFormComponent,
    AmexContactInformationFormComponent, AmexCountryMasterFormComponent, AmexCurrencyMasterFormComponent,
    AmexSOCROCEntryFormComponent, AmexMerchantDataFormComponent, AmexAddDeleteMerchantPanelComponent,
    AmexPaymentAllocationFormComponent, AmexReportFormatFormComponent, AmexVATRegistrationFormComponent,
    AmexUploadCertificatePanelComponent, AmexTaxInvoiceDeliveryFormComponent, AmexCustomizedReportsFormComponent,
    AmexAlgeriaPaymentFormComponent, AmexWearableIssuanceFormComponent, AmexCenturionCardArtSelectorComponent,
    AmexFileUploadFormComponent, AmexVATInvoiceSearchFormComponent, AmexUAEFTSStatementRequestFormComponent,
    AmexNewOutletApplicationFormComponent, AmexMRMCreateEditUserFormComponent,
  ],
  template: `
    <app-showcase-page title="AMEX Forms" description="23 form components matching exact AEME portal screenshots across OMS, SOC/ROC, BTA, Wearables, Centurion, UAEFTS, and VAT Invoice portals.">

      <app-variant-section title="1 · AddUserForm — OMS Create/Edit MRM User (image42)">
        <div class="two-col">
          <div><p class="vl">Create MRM User</p><amex-add-user-form title="CREATE MRM USER"></amex-add-user-form></div>
          <div><p class="vl">Edit MRM User (pre-filled)</p>
            <amex-add-user-form title="EDIT MRM USER" [showUserId]="true" [userIdReadonly]="true" [showPassword]="false" [showRole]="false"></amex-add-user-form>
          </div>
        </div>
      </app-variant-section>

      <app-variant-section title="2 · EditUserForm — pre-filled update form">
        <amex-edit-user-form title="EDIT MRM USER"
          [data]="{userId:'wasimtest123',userName:'wasimtest123',emailAddress:'wasim.sayyed@americanexpress.com.bh',role:'',status:'Active'}">
        </amex-edit-user-form>
      </app-variant-section>

      <app-variant-section title="3 · EditMyDetailsForm — BTA logged-in user profile">
        <amex-edit-my-details-form panelTitle="Edit My Details"
          [initialData]="{name:'Ahmed Al Mansouri',email:'ahmed@company.ae',phone:'+971 50 123 4567'}">
        </amex-edit-my-details-form>
      </app-variant-section>

      <app-variant-section title="4 · ContactInformationForm — OMS Operations (3 contact rows, image20/image60)">
        <amex-contact-information-form sectionTitle="Operations"></amex-contact-information-form>
      </app-variant-section>

      <app-variant-section title="5 · CountryMasterForm — SOC/ROC Add New / Modify">
        <div class="two-col">
          <div><p class="vl">Add New mode</p><amex-country-master-form></amex-country-master-form></div>
          <div><p class="vl">Modify mode (autocomplete → code auto-fills)</p><amex-country-master-form></amex-country-master-form></div>
        </div>
      </app-variant-section>

      <app-variant-section title="6 · CurrencyMasterForm — SOC/ROC Add New / Modify">
        <amex-currency-master-form></amex-currency-master-form>
      </app-variant-section>

      <app-variant-section title="7 · SOCROCEntryForm — SOC and ROC entry (image15)">
        <amex-socroc-entry-form></amex-socroc-entry-form>
      </app-variant-section>

      <app-variant-section title="8 · MerchantDataForm — OMS full merchant record">
        <amex-merchant-data-form></amex-merchant-data-form>
      </app-variant-section>

      <app-variant-section title="9 · AddDeleteMerchantPanel — OMS Add or Delete merchant">
        <amex-add-delete-merchant-panel></amex-add-delete-merchant-panel>
      </app-variant-section>

      <app-variant-section title="10 · PaymentAllocationForm — BTA Billed/Unbilled tabs">
        <amex-payment-allocation-form
          [accounts]="[{value:'BTACLIENTBAH001',label:'BTACLIENTBAH001-3744XXXXXX5229'}]"
          [billedTransactions]="[{date:'01/09/2024',description:'Emirates Airlines',amount:'AED 1,200.00'}]"
          [unbilledTransactions]="[{date:'20/09/2024',description:'NOON PAYMENTS',amount:'AED 300.00'}]">
        </amex-payment-allocation-form>
      </app-variant-section>

      <app-variant-section title="11 · ReportFormatForm — OMS Select report formats (image22)">
        <amex-report-format-form></amex-report-format-form>
      </app-variant-section>

      <app-variant-section title="12 · VATRegistrationForm — OMS 3-step panel (image23)">
        <amex-vat-registration-form></amex-vat-registration-form>
      </app-variant-section>

      <app-variant-section title="13 · UploadCertificatePanel — OMS VAT certificate upload">
        <div class="two-col">
          <div><p class="vl">Idle</p><amex-upload-certificate-panel status="idle"></amex-upload-certificate-panel></div>
          <div><p class="vl">Success</p><amex-upload-certificate-panel status="success" statusMessage="Certificate uploaded successfully."></amex-upload-certificate-panel></div>
        </div>
      </app-variant-section>

      <app-variant-section title="14 · TaxInvoiceDeliveryForm — OMS TAX Invoice Delivery (image26)">
        <div class="two-col">
          <div><p class="vl">Default</p><amex-tax-invoice-delivery-form></amex-tax-invoice-delivery-form></div>
          <div><p class="vl">With validation error</p><amex-tax-invoice-delivery-form [showError]="true"></amex-tax-invoice-delivery-form></div>
        </div>
      </app-variant-section>

      <app-variant-section title="15 · CustomizedReportsForm — OMS report type tabs + date range">
        <amex-customized-reports-form></amex-customized-reports-form>
      </app-variant-section>

      <app-variant-section title="16 · AlgeriaPaymentForm — SOC/ROC Algeria Payment (image38)">
        <amex-algeria-payment-form></amex-algeria-payment-form>
      </app-variant-section>

      <app-variant-section title="17 · WearableIssuanceForm — My Amex Wearable right panel (image9)">
        <div class="two-col">
          <div><p class="vl">Empty</p>
            <amex-wearable-issuance-form [form]="{clientCode:'20510406',selectedCard:'The American Express Gold Credit Card - Card Ending 7018',wearableType:'',colorSelected:'',wearableName:'',tcAccepted:false}"></amex-wearable-issuance-form>
          </div>
          <div><p class="vl">Selected — Bracelet + T&C accepted</p>
            <amex-wearable-issuance-form [form]="{clientCode:'20510406',selectedCard:'The American Express Gold Credit Card - Card Ending 7018',wearableType:'Leather Bracelet',colorSelected:'#8B4513',wearableName:'QARR',tcAccepted:true}"></amex-wearable-issuance-form>
          </div>
        </div>
      </app-variant-section>

      <app-variant-section title="18 · CenturionCardArtSelector — Centurion Living card art grid">
        <amex-centurion-card-art-selector title="Select Card Art"></amex-centurion-card-art-selector>
      </app-variant-section>

      <app-variant-section title="19 · FileUploadForm — BCRB/SOC/Centurion file upload">
        <div class="two-col">
          <div><p class="vl">Centurion (.txt)</p><amex-file-upload-form title="Load Client Data" hintText="Please upload only .txt file" acceptedTypes=".txt"></amex-file-upload-form></div>
          <div><p class="vl">BCRB (.csv)</p><amex-file-upload-form title="Upload BCRB Report" hintText="Please upload a .csv file" acceptedTypes=".csv"></amex-file-upload-form></div>
        </div>
      </app-variant-section>

      <app-variant-section title="20 · VATInvoiceSearchForm — Corporate/Consumer + 3 search modes">
        <amex-vat-invoice-search-form></amex-vat-invoice-search-form>
      </app-variant-section>

      <app-variant-section title="21 · UAEFTSStatementRequestForm — Request Bank Statement + success popup (image4/5)">
        <div class="two-col">
          <div><p class="vl">Request form</p><amex-uaefts-statement-request-form [successData]="null"></amex-uaefts-statement-request-form></div>
          <div><p class="vl">Successful Request popup</p><amex-uaefts-statement-request-form [successData]="{referenceNumber:'SFE250526134510'}"></amex-uaefts-statement-request-form></div>
        </div>
      </app-variant-section>

      <app-variant-section title="22 · NewOutletApplicationForm — OMS Sub-User add outlet">
        <amex-new-outlet-application-form></amex-new-outlet-application-form>
      </app-variant-section>

      <app-variant-section title="23 · MRMCreateEditUserForm — OMS MRM user with merchant access">
        <div class="two-col">
          <div><p class="vl">Create</p><amex-mrm-create-edit-user-form title="CREATE MRM USER"></amex-mrm-create-edit-user-form></div>
          <div><p class="vl">Edit (pre-filled)</p>
            <amex-mrm-create-edit-user-form title="EDIT MRM USER"
              [form]="{name:'Essa',email:'essa.memon@americanexpress.com.bh',username:'mrmadmin',role:'mrm_admin',merchantAccess:['9275640241']}">
            </amex-mrm-create-edit-user-form>
          </div>
        </div>
      </app-variant-section>

    </app-showcase-page>
  `,
  styles: [`.two-col{display:flex;gap:24px;width:100%;flex-wrap:wrap;}.two-col>div{flex:1;min-width:280px;}.vl{font-size:11px;color:#888;font-style:italic;margin:0 0 6px;}`],
})
export class AmexFormsPageComponent {}
