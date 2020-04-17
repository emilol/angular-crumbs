import { Component, OnInit } from '@angular/core';

import { Breadcrumb } from './breadcrumb';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'breadcrumb',
    template:
    `<div #template>
    <ng-content></ng-content>
</div>
<div class="container" *ngIf="template.children.length == 0">
    <div class="nav-wrapper">
        <div class="breadcrumb" *ngFor="let route of breadcrumbs" [ngClass]="{'last': route.terminal}">
            <!-- disable link of last item -->
            <a href="" *ngIf="!route.terminal" [routerLink]="[route.url]">{{ route.displayName }}</a>
            <span *ngIf="route.terminal">{{ route.displayName }}</span>
        </div>
    </div>
</div>`
})
export class BreadcrumbComponent {
    breadcrumbs: Breadcrumb[];

    constructor(private breadcrumbService: BreadcrumbService) {
        breadcrumbService.breadcrumbChanged.subscribe((crumbs: Breadcrumb[]) => { this.onBreadcrumbChange(crumbs); });
    }

    private onBreadcrumbChange(crumbs: Breadcrumb[]) {
        this.breadcrumbs = crumbs;
    }
}
