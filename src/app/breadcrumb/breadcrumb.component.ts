import { Component } from "@angular/core";
import { Breadcrumb, BreadcrumbService } from "./breadcrumb.service"

@Component({
    selector: "breadcrumb",
    templateUrl: "./breadcrumb.component.html",
    styleUrls: ["./breadcrumb.component.css"]
})
export class BreadcrumbComponent {
    breadcrumbsCollection: Breadcrumb[];

    constructor(private breadcrumbService: BreadcrumbService) {
        breadcrumbService.onBreadcrumbChange.subscribe((crumbs) => {
            this.breadcrumbsCollection = crumbs;
        });
    }
}