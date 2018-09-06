# Angular Breadcrumb

## Installation

```shell
npm install angular-crumbs --save
```

#### 1. Import the `BreadcrumbModule`
Import `BreadcrumbModule` in the NgModule of your application.

```typescript
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from '@angular/core';
import {BreadcrumbModule} from 'angular-crumbs';

@NgModule({
    imports: [
        BrowserModule,
        BreadcrumbModule
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

## Demo [(live)](https://emilol.github.io/angular-crumbs)

![Breadcrumb Demo](https://i.imgur.com/QcpGLu6.png)

## Customization

### Template Customization

You can BYO template using the breadcrumb's ng-content transclude. 

#### Bootstrap breadcrumb:

```html 
<breadcrumb #parent>
  <nav class="breadcrumb">
    <ng-template ngFor let-route [ngForOf]="parent.breadcrumbs">
      <a    *ngIf="!route.terminal" class="breadcrumb-item" href="" [routerLink]="[route.url]">{{ route.displayName }}</a>
      <span *ngIf="route.terminal"  class="breadcrumb-item active">{{ route.displayName }}</span>
    </ng-template>
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

Use `BreadcrumbService` to set the breadcrumb description dynamically. [See full demo example](https://github.com/emilol/angular-crumbs/blob/master/demo/src/app/github/repo-detail/repo-detail.component.ts)

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

Use `BreadcrumbService` to subscribe to breadcrumb changes. [See full demo example](https://github.com/emilol/angular-crumbs/blob/master/demo/src/app/app.component.ts)

```typescript
ngOnInit() {
  this.breadcrumbService.breadcrumbChanged.subscribe((crumbs) => {
    this.titleService.setTitle(this.createTitle(crumbs));
  });
}
```

# License
 [MIT](/LICENSE)