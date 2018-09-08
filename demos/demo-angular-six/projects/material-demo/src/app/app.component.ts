import { Component, ViewEncapsulation, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {MediaMatcher} from '@angular/cdk/layout';

import { Breadcrumb, BreadcrumbService } from 'angular-crumbs';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;

    constructor(
        private titleService: Title,
        private breadcrumbService: BreadcrumbService,
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit() {
        this.breadcrumbService.breadcrumbChanged.subscribe((crumbs) => {
            this.titleService.setTitle(this.createTitle(crumbs));
        });
    }

    ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
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
