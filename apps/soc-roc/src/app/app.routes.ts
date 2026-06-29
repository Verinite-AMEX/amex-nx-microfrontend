import { Routes } from '@angular/router';
import { socRocAuthGuard } from './core/guards/soc-roc-auth.guard';

import { Login } from './pages/login/login';
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
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },

    // Default redirect
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // Protected routes
    { path: 'dashboard', component: Dashboard, canActivate: [socRocAuthGuard] },

    { path: 'masters/country-master', component: CountryMaster, canActivate: [socRocAuthGuard] },
    { path: 'masters/currency-master', component: CurrencyMaster, canActivate: [socRocAuthGuard] },

    { path: 'merchant-data', component: MerchantDataComponent, canActivate: [socRocAuthGuard] },

    { path: 'soc-roc-transactions', component: SocRocTransactionsComponent, canActivate: [socRocAuthGuard] },

    { path: 'reports/details-by-currency', component: DetailsByCurrency, canActivate: [socRocAuthGuard] },
    { path: 'reports/soc-control-report', component: SocControlReport, canActivate: [socRocAuthGuard] },
    { path: 'reports/rejection-letter', component: RejectionLetter, canActivate: [socRocAuthGuard] },
    { path: 'reports/rejection-letter-details', component: RejectionLetterDetails, canActivate: [socRocAuthGuard] },
    { path: 'reports/consolidated-rejection-report', component: ConsolidatedRejectionReport, canActivate: [socRocAuthGuard] },

    { path: 'utilities/file-formation-upload', component: FileFormationUpload, canActivate: [socRocAuthGuard] },
    { path: 'utilities/extract-rejected-items', component: ExtractRejectedItems, canActivate: [socRocAuthGuard] },
    { path: 'utilities/retrieval-old-records', component: RetrievalOldRecords, canActivate: [socRocAuthGuard] },
    { path: 'utilities/download-soc-roc-excel', component: DownloadSocRocExcel, canActivate: [socRocAuthGuard] },
    { path: 'utilities/download-multiple-se', component: DownloadMultipleSe, canActivate: [socRocAuthGuard] },
    { path: 'utilities/capture-multiple-se', component: CaptureMultipleSe, canActivate: [socRocAuthGuard] },

    { path: 'retrieval', component: Retrieval, canActivate: [socRocAuthGuard] },
    { path: 'algeria-payment', component: AlgeriaPayment, canActivate: [socRocAuthGuard] },
    { path: 'payment-register', component: PaymentRegister, canActivate: [socRocAuthGuard] },
];