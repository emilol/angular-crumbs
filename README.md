# Angular2 Breadcrumb

## Installation

```shell
npm install angular2-crumbs --save
```

#### 1. Import the `BreadcrumbModule`
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

#### 2. Set breadcumbs in `app.routes`
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

#### 3. Update the markup
- Import the `style.css` into your web page
- Add `<breadcrumb></breadcrumb>` tag in template of your application component.

## Demo

![Breadcrumb Demo](http://i.imgur.com/CTDwBUK.png)

## Customization

### Template Customization

You can BYO template using the breadcrumb's ng-content transclude. 

#### Bootstrap breadcrumb:

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

#### Materialize Breadcrumb

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

### Dynamic breadcrumbs 

Use `BreadcrumbService` to set the breadcrumb description dynamically. [See full demo example](https://github.com/emilol/angular-crumbs/blob/angular2-crumbs/demo/src/app/github/repo-detail/repo-detail.component.ts)

```typescript
ngOnInit() {
  ...      
  this.github
    .getRepoForOrg(this.org, this.repo)
    .subscribe(repoDetails => {
        ...
        this.breadcrumbService.changeBreadcrumb(this.route.snapshot, repoDetails.name);

  });
  ...
}
```

### Dynamic page titles

Use `BreadcrumbService` to subscribe to breadcrumb changes. [See full demo example](https://github.com/emilol/angular-crumbs/blob/angular2-crumbs/demo/src/app/app.component.ts)

```typescript
ngOnInit() {
  this.breadcrumbService.onBreadcrumbChange.subscribe((crumbs) => {
    this.titleService.setTitle(this.createTitle(crumbs));
  });
}
```

# License
 [MIT](/LICENSE)