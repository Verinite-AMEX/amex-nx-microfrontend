import { Routes } from '@angular/router';
import { authGuard } from '@amex/shared-services';

//import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';

import { FileFormationUpload } from './pages/utilities/file-formation-upload/file-formation-upload';
import { CountryMaster } from './pages/masters/country-master/country-master.component';
import { CurrencyMaster } from './pages/masters/currency-master/currency-master.component';
import { MerchantDataComponent } from './pages/merchant-data/merchant-data';
import { SocRocTransactionsComponent } from './pages/soc-roc-transactions/soc-roc-transactions';
import { Dashboard } from './pages/dashboard/dashboard.component';
import { ExtractRejectedItems } from './pages/utilities/extract-rejected-items/extract-rejected-items';
import { RetrievalOldRecords } from './pages/utilities/retrieval-old-records/retrieval-old-records';
import { DownloadSocRocExcel } from './pages/utilities/download-soc-roc-excel/download-soc-roc-excel';
import { DownloadMultipleSe } from './pages/utilities/download-multiple-se/download-multiple-se';
import { CaptureMultipleSe } from './pages/utilities/capture-multiple-se/capture-multiple-se';
import { DetailsByCurrency } from './pages/reports/details-by-currency/details-by-currency';
import { SocControlReport } from './pages/reports/soc-control-report/soc-control-report';
import { RejectionLetter } from './pages/reports/rejection-letter/rejection-letter';
import { RejectionLetterDetails } from './pages/reports/rejection-letter-details/rejection-letter-details';
import { ConsolidatedRejectionReport } from './pages/reports/consolidated-rejection-report/consolidated-rejection-report';
import { Retrieval } from './pages/retrieval/retrieval';
import { AlgeriaPayment } from './pages/algeria-payment/algeria-payment';
import { PaymentRegister } from './pages/payment-register/payment-register';

export const routes: Routes = [
    // Public routes - no guard
   // { path: 'login', component: Login },
    { path: 'signup', component: Signup },

     // OLD:
    // { path: '', redirectTo: 'login', pathMatch: 'full' },
    // NEW — default lands on the guarded dashboard; guard bounces to auth app if needed
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    // Protected routes
    { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },

    { path: 'masters/country-master', component: CountryMaster, canActivate: [authGuard] },
    { path: 'masters/currency-master', component: CurrencyMaster, canActivate: [authGuard] },

    { path: 'merchant-data', component: MerchantDataComponent, canActivate: [authGuard] },

    { path: 'soc-roc-transactions', component: SocRocTransactionsComponent, canActivate: [authGuard] },

    { path: 'reports/details-by-currency', component: DetailsByCurrency, canActivate: [authGuard] },
    { path: 'reports/soc-control-report', component: SocControlReport, canActivate: [authGuard] },
    { path: 'reports/rejection-letter', component: RejectionLetter, canActivate: [authGuard] },
    { path: 'reports/rejection-letter-details', component: RejectionLetterDetails, canActivate: [authGuard] },
    { path: 'reports/consolidated-rejection-report', component: ConsolidatedRejectionReport, canActivate: [authGuard] },

    { path: 'utilities/file-formation-upload', component: FileFormationUpload, canActivate: [authGuard] },
    { path: 'utilities/extract-rejected-items', component: ExtractRejectedItems, canActivate: [authGuard] },
    { path: 'utilities/retrieval-old-records', component: RetrievalOldRecords, canActivate: [authGuard] },
    { path: 'utilities/download-soc-roc-excel', component: DownloadSocRocExcel, canActivate: [authGuard] },
    { path: 'utilities/download-multiple-se', component: DownloadMultipleSe, canActivate: [authGuard] },
    { path: 'utilities/capture-multiple-se', component: CaptureMultipleSe, canActivate: [authGuard] },

    { path: 'retrieval', component: Retrieval, canActivate: [authGuard] },
    { path: 'algeria-payment', component: AlgeriaPayment, canActivate: [authGuard] },
    { path: 'payment-register', component: PaymentRegister, canActivate: [authGuard] },
];