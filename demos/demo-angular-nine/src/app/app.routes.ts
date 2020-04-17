import {Routes} from '@angular/router';
import {HomeComponent} from './shared/home/home.component';
import { AboutComponent } from './shared/about/about.component';
import { GitHubComponent } from './shared/github/github.component';
import { OrganisationComponent } from './shared/github/organisation/organisation.component';
import { RepoListComponent } from './shared/github/repo-list/repo-list.component';
import { RepoDetailComponent } from './shared/github/repo-detail/repo-detail.component';
import { RepoBrowserComponent } from './github/repo-browser/repo-browser.component';

export const rootRouterConfig: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, data: { breadcrumb: 'Home'}},
  {path: 'about', component: AboutComponent, data: { breadcrumb: 'About'}},
  {path: 'github', component: GitHubComponent, data: { breadcrumb: 'GitHub'},
    children: [
      {path: '', component: RepoBrowserComponent},
      {path: ':org', component: OrganisationComponent, data: { breadcrumb: 'Organisation'},
        children: [
          {path: '', component: RepoListComponent },
          {path: ':repo', component: RepoDetailComponent, data: { breadcrumb: 'Repo'}}
        ]
      }
    ]
  }
];
