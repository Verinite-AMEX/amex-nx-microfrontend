// apps/soc-roc/src/app/remote-entry/entry.routes.ts
import { Routes } from '@angular/router';
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
  { path: 'dashboard', component: Dashboard },
  { path: 'masters/country-master', component: CountryMaster },
  { path: 'masters/currency-master', component: CurrencyMaster },
  { path: 'utilities/file-formation-upload', component: FileFormationUpload },
  { path: 'utilities/extract-rejected-items', component: ExtractRejectedItems },
  { path: 'utilities/retrieval-old-records', component: RetrievalOldRecords },
  { path: 'utilities/download-soc-roc-excel', component: DownloadSocRocExcel },
  { path: 'utilities/download-multiple-se', component: DownloadMultipleSe },
  { path: 'utilities/capture-multiple-se', component: CaptureMultipleSe },
  { path: 'reports/details-by-currency', component: DetailsByCurrency},
];

export default remoteRoutes;