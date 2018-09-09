import {Routes} from '@angular/router';
import { AboutComponent } from 'src/app/shared/about/about.component';
import { HomeComponent } from 'src/app/shared/home/home.component';
import {RepoBrowserComponent} from './github/repo-browser/repo-browser.component';
import {RepoDetailComponent} from 'src/app/shared/github/repo-detail/repo-detail.component';
import { GitHubComponent } from 'src/app/shared/github/github.component';
import { OrganisationComponent } from 'src/app/shared/github/organisation/organisation.component';
import { RepoListComponent } from 'src/app/shared/github/repo-list/repo-list.component';

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

