import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Breadcrumb, BreadcrumbService } from 'angular-crumbs';
import { GithubService } from 'src/app/shared/github.service';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    constructor(
        private titleService: Title,
        private breadcrumbService: BreadcrumbService,
        private github: GithubService) { }

    ngOnInit() {
        this.breadcrumbService.breadcrumbChanged.subscribe((crumbs) => {
            this.titleService.setTitle(this.createTitle(crumbs));
        });
    }

    get shortcuts() {
      return this.github.getShorcuts();
    }

    private createTitle(routesCollection: Breadcrumb[]) {
        const title = 'Angular Breadcrumb';
        const titles = routesCollection.filter((route) => route.displayName);

        if (!titles.length) { return title; }

        const routeTitle = this.titlesToString(titles);
        return `${routeTitle} ${title}`;
    }

    private titlesToString(titles) {
        return titles.reduce((prev, curr) => {
            return `${curr.displayName} - ${prev}`;
        }, '');
    }
}
