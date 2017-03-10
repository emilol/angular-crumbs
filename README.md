# Angular2 Breadcrumb

## Installation

```shell
npm install angular2-crumbs --save
```

#### 1. Update the markup
- Import the `style.css` into your web page
- Add `<breadcrumb></breadcrumb>` tag in template of your application component.

#### 2. Import the `BreadcrumbModule`
Import `BreadcrumbModule.forRoot()` in the NgModule of your application. 
The `forRoot` method is a convention for modules that provide a singleton service.

```typescript
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
export class AppModule {}
```
#### 3. Set breadcumbs in `app.routes`
```javascript
export const rootRouterConfig: Routes = [  
    {path: '', redirectTo: 'home', pathMatch: 'full'},  
    {path: 'home', ..., data: { breadcrumb: 'Home'}},  
    {path: 'about', ..., data: { breadcrumb: 'About'}},  
    {path: 'github', ..., data: { breadcrumb: 'GitHub'},  
        children: [  
            {path: '', ...},  
            {path: ':org', ..., data: { breadcrumb: 'Repo List'},  
                children: [  
                    {path: '', ...},  
                    {path: ':repo', ..., data: { breadcrumb: 'Repo'}}  
                ]  
        }]  
    }  
];
```

#### 4. Use the `BreadcrumbService` for your application
- Import `BreadcrumbService` from `angular2-crumbs` to update your page title based on the active route:

```typescript
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

        if (!titles.length) return title;
        
        const routeTitle = this.titlesToString(titles);
        return `${routeTitle} ${title}`;
    }

    private titlesToString(titles) {
        titles.reduce((prev, curr) => { 
            return `${curr.displayName} - ${prev}`; 
        }, "");
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