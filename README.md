# Angular2 Breadcrumb

## Installation

```sh
npm install angular2-crumbs --save
```

#### 1. Update the markup
- Import the `style.css` into your web page
- Add `<breadcrumb></breadcrumb>` tag in template of your application component.

#### 2. Import the `BreadcrumbModule`
Import `BreadcrumbModule.forRoot()` in the NgModule of your application. 
The `forRoot` method is a convention for modules that provide a singleton service.

```ts
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from '@angular/core';
import {BreadcrumbModule} from 'angular2-crumbs';

@NgModule({
    imports: [
        BrowserModule,
        BreadcrumbModule.forRoot()
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```
#### 3. Set breadcumbs in `app.routes`
```js
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
```

#### 4. Use the `BreadcrumbService` for your application
- Import `BreadcrumbService` from `angular2-crumbs` to update your page title based on the active route:

```ts
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Breadcrumb, BreadcrumbService } from 'angular2-crumbs';

@Component({
  selector   : 'app',
  templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(
        private titleService: Title,
        private breadcrumbService: BreadcrumbService) {
        breadcrumbService.onBreadcrumbChange.subscribe((crumbs) => {
            this.titleService.setTitle(this.createTitle(crumbs));
        });
    }
    
    private createTitle(routesCollection: Breadcrumb[]) {
        const title = 'Angular2 Breadcrumb';
        const titles = routesCollection.filter((route) => route.displayName);

        if (titles.length) {
            const routeTitle = titles
                .reduce((prev, curr) => { return `${curr.displayName} - ${prev}`; }, "");

            return `${routeTitle} ${title}`;
        }

        return title;
    }
}
```

## Demo

![Breadcrumb Demo](http://imgur.com/S2PSW3W.png)

## Customization

You can BYO template using the breadcrumb's ng-content transclude. 

### Bootstrap breadcrumb:

```html 
<breadcrumb #parent>
  <nav class="breadcrumb">
    <template ngFor let-route [ngForOf]="parent.breadcrumbs">
      <a    *ngIf="!route.terminal" class="breadcrumb-item" href="" [routerLink]="[route.url]">{{ route.displayName }}</a>
      <span *ngIf="route.terminal"  class="breadcrumb-item active">{{ route.displayName }}</span>
    </template>
  </nav>
</breadcrumb>
```

### Materialize Breadcrumb

```html
<breadcrumb #parent>
  <nav>
    <div class="nav-wrapper">
      <div class="col s12">
        <template ngFor let-route [ngForOf]="parent.breadcrumbs">
          <a    *ngIf="!route.terminal" class="breadcrumb" href="" [routerLink]="[route.url]">{{ route.displayName }}</a>
          <span *ngIf="route.terminal"  class="breadcrumb">{{ route.displayName }}</span>
        </template>
      </div>
    </div>
  </nav>
</breadcrumb>
```

# License
 [MIT](/LICENSE)