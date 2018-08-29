import {Routes} from '@angular/router';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {RepoBrowserComponent} from './github/repo-browser/repo-browser.component';
import {RepoListComponent} from './github/repo-list/repo-list.component';
import {RepoDetailComponent} from './github/repo-detail/repo-detail.component';

export const rootRouterConfig: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, data: { breadcrumb: 'Home'}},
  {path: 'about', component: AboutComponent, data: { breadcrumb: 'About'}},
  {path: 'github', component: RepoBrowserComponent, data: { breadcrumb: 'GitHub'},
    children: [
      {path: '', component: RepoListComponent},
      {path: ':org', component: RepoListComponent, data: { breadcrumb: 'Repo List'},
        children: [
          {path: '', component: RepoDetailComponent},
          {path: ':repo', component: RepoDetailComponent, data: { breadcrumb: 'Repo'}}
        ]
      }]
  }
];

