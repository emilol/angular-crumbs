import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { BreadcrumbService } from './breadcrumb.service';
import { BreadcrumbComponent } from './breadcrumb.component';

export function breadcrumbServiceFactory(router: Router) {
    return new BreadcrumbService(router);
}

@NgModule({
    imports: [CommonModule, RouterModule],
    providers: [
        { provide: BreadcrumbService, useFactory: breadcrumbServiceFactory, deps: [Router] }
    ],
    declarations: [BreadcrumbComponent],
    exports: [BreadcrumbComponent]
})
export class BreadcrumbModule { }
