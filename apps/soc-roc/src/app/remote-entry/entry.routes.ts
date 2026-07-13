// apps/soc-roc/src/app/remote-entry/entry.routes.ts
import { Routes } from '@angular/router';
import { socRocAuthGuard } from '../core/guards/soc-roc-auth.guard'; 
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
  // NEW — canActivate added to every route below, matching app.routes.ts
  { path: 'dashboard', component: Dashboard, canActivate: [socRocAuthGuard] },
  { path: 'masters/country-master', component: CountryMaster, canActivate: [socRocAuthGuard] },
  { path: 'masters/currency-master', component: CurrencyMaster, canActivate: [socRocAuthGuard] },
  { path: 'utilities/file-formation-upload', component: FileFormationUpload, canActivate: [socRocAuthGuard] },
  { path: 'utilities/extract-rejected-items', component: ExtractRejectedItems, canActivate: [socRocAuthGuard] },
  { path: 'utilities/retrieval-old-records', component: RetrievalOldRecords, canActivate: [socRocAuthGuard] },
  { path: 'utilities/download-soc-roc-excel', component: DownloadSocRocExcel, canActivate: [socRocAuthGuard] },
  { path: 'utilities/download-multiple-se', component: DownloadMultipleSe, canActivate: [socRocAuthGuard] },
  { path: 'utilities/capture-multiple-se', component: CaptureMultipleSe, canActivate: [socRocAuthGuard] },
  { path: 'reports/details-by-currency', component: DetailsByCurrency, canActivate: [socRocAuthGuard] },
];

export default remoteRoutes;