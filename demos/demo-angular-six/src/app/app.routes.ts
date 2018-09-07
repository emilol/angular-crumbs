import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';

export const rootRouterConfig: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'}
];

