
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AddAssetsComponent } from './components/add-assets/add-assets.component';

import { AssetsOverviewComponent } from './components/assets-overview/assets-overview.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'add-assets', component: AddAssetsComponent },
  { path: 'assets-overview', component: AssetsOverviewComponent },
];
