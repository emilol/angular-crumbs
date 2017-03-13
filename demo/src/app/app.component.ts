import { Component, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Breadcrumb, BreadcrumbService } from 'angular2-crumbs';

@Component({
  selector   : 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    constructor(
        private titleService: Title,
        private breadcrumbService: BreadcrumbService) { }

    ngOnInit() {
        this.breadcrumbService.onBreadcrumbChange.subscribe((crumbs) => {
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
        return titles.reduce((prev, curr) => { 
            return `${curr.displayName} - ${prev}`; 
        }, "");
    }
}
