import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'angular-crumbs';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';

import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { GitHubComponent } from './github/github.component';
import { RepoBrowserComponent } from './github/repo-browser/repo-browser.component';
import { RepoListComponent } from './github/repo-list/repo-list.component';
import { RepoDetailComponent } from './github/repo-detail/repo-detail.component';
import { HomeComponent } from './home/home.component';

import { APP_RESOLVER_PROVIDERS } from 'src/app/app.resolver';
import { OrganisationComponent } from './github/organisation/organisation.component';

const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    RepoBrowserComponent,
    RepoListComponent,
    RepoDetailComponent,
    HomeComponent,
    GitHubComponent,
    OrganisationComponent
  ],
  imports: [
    BrowserModule,
    BreadcrumbModule,
    FormsModule,
    HttpModule,
    CommonModule,
    NoopAnimationsModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    RouterModule.forRoot(rootRouterConfig)
  ],
  providers: [
    APP_PROVIDERS,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}
