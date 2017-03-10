import { Component } from "@angular/core";
import { Breadcrumb, BreadcrumbService } from "./breadcrumb.service"

@Component({
    selector: "breadcrumb",
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
        breadcrumbService.onBreadcrumbChange.subscribe((crumbs: Breadcrumb[]) => {
            this.breadcrumbs = crumbs;
        });
    }
}