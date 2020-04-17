import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router';
import {rootRouterConfig} from './app.routes';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {PanelMenuModule} from 'primeng/panelmenu';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {BreadcrumbModule as PrimeNGBreadcrumbModule} from 'primeng/breadcrumb';

import { AppComponent } from './app.component';
import { HomeComponent } from './shared/home/home.component';
import { AboutComponent } from './shared/about/about.component';
import { GitHubComponent } from './shared/github/github.component';
import { OrganisationComponent } from './shared/github/organisation/organisation.component';
import { RepoListComponent } from './shared/github/repo-list/repo-list.component';
import { RepoDetailComponent } from './shared/github/repo-detail/repo-detail.component';
import { RepoBrowserComponent } from './github/repo-browser/repo-browser.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { BreadcrumbModule } from 'angular-crumbs';

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
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    BreadcrumbModule,
    PrimeNGBreadcrumbModule,
    PanelMenuModule,
    MenuModule,
    MenubarModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    RouterModule.forRoot(rootRouterConfig)
  ],
  providers: [
    APP_PROVIDERS,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
