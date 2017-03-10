import {NgModule} from '@angular/core'
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {BreadcrumbModule} from "angular2-crumbs";
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {RepoBrowserComponent} from './github/repo-browser/repo-browser.component';
import {RepoListComponent} from './github/repo-list/repo-list.component';
import {RepoDetailComponent} from './github/repo-detail/repo-detail.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { APP_RESOLVER_PROVIDERS } from './app.resolver';

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
    HomeComponent    
  ],
  imports: [
    BrowserModule, 
    BreadcrumbModule.forRoot(),
    FormsModule, 
    HttpModule, 
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
