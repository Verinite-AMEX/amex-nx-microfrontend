import { Routes } from '@angular/router';
import { authGuard } from '@amex/shared-services';
import { Dashboard } from '../pages/dashboard/dashboard.component';
import { CountryMaster } from '../pages/masters/country-master/country-master.component';
import { CurrencyMaster } from '../pages/masters/currency-master/currency-master.component';
import { FileFormationUpload } from '../pages/utilities/file-formation-upload/file-formation-upload';
import { ExtractRejectedItems } from '../pages/utilities/extract-rejected-items/extract-rejected-items';
import { RetrievalOldRecords } from '../pages/utilities/retrieval-old-records/retrieval-old-records';
import { DownloadSocRocExcel } from '../pages/utilities/download-soc-roc-excel/download-soc-roc-excel';
import { DownloadMultipleSe } from '../pages/utilities/download-multiple-se/download-multiple-se';
import { CaptureMultipleSe } from '../pages/utilities/capture-multiple-se/capture-multiple-se';
import { DetailsByCurrency } from '../pages/reports/details-by-currency/details-by-currency';

export const remoteRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'masters/country-master', component: CountryMaster, canActivate: [authGuard] },
  { path: 'masters/currency-master', component: CurrencyMaster, canActivate: [authGuard] },
  { path: 'utilities/file-formation-upload', component: FileFormationUpload, canActivate: [authGuard] },
  { path: 'utilities/extract-rejected-items', component: ExtractRejectedItems, canActivate: [authGuard] },
  { path: 'utilities/retrieval-old-records', component: RetrievalOldRecords, canActivate: [authGuard] },
  { path: 'utilities/download-soc-roc-excel', component: DownloadSocRocExcel, canActivate: [authGuard] },
  { path: 'utilities/download-multiple-se', component: DownloadMultipleSe, canActivate: [authGuard] },
  { path: 'utilities/capture-multiple-se', component: CaptureMultipleSe, canActivate: [authGuard] },
  { path: 'reports/details-by-currency', component: DetailsByCurrency, canActivate: [authGuard] },
];

export default remoteRoutes;