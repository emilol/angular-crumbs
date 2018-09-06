import { Injectable, EventEmitter } from '@angular/core';
import { Router, ActivatedRouteSnapshot, Event, NavigationEnd } from '@angular/router';

import { Breadcrumb } from './breadcrumb';

@Injectable()
export class BreadcrumbService {
    breadcrumbChanged = new EventEmitter<Breadcrumb[]>(false);

    private breadcrumbs = new Array<Breadcrumb>();

    constructor(private router: Router) {
        this.router.events.subscribe((routeEvent) => { this.onRouteEvent(routeEvent); });
    }

    public changeBreadcrumb(route: ActivatedRouteSnapshot, name: string) {
        const rootUrl = this.createRootUrl(route);
        const breadcrumb = this.breadcrumbs.find(function (bc) { return bc.url === rootUrl; });

        if (!breadcrumb) { return; }

        breadcrumb.displayName = name;

        this.breadcrumbChanged.emit(this.breadcrumbs);
    }

    private onRouteEvent(routeEvent: Event) {
        if (!(routeEvent instanceof NavigationEnd)) { return; }

        let route = this.router.routerState.root.snapshot;
        let url = '';

        this.breadcrumbs = [];

        while (route.firstChild != null) {
            route = route.firstChild;

            if (route.routeConfig === null) { continue; }
            if (!route.routeConfig.path) { continue; }

            url += `/${this.createUrl(route)}`;

            if (!route.data['breadcrumb']) { continue; }

            this.breadcrumbs.push(this.createBreadcrumb(route, url));
        }

        this.breadcrumbChanged.emit(this.breadcrumbs);
    }

    private createBreadcrumb(route: ActivatedRouteSnapshot, url: string): Breadcrumb {
        return {
            displayName: route.data['breadcrumb'],
            terminal: this.isTerminal(route),
            url: url
        }
    }

    private isTerminal(route: ActivatedRouteSnapshot) {
        return route.firstChild === null
            || route.firstChild.routeConfig === null
            || !route.firstChild.routeConfig.path;
    }

    private createUrl(route: ActivatedRouteSnapshot) {
        return route.url.map(function (s) { return s.toString(); }).join('/');
    }

    private createRootUrl(route: ActivatedRouteSnapshot) {
        let url = '';
        let next = route.root;

        while (next.firstChild !== null) {
            next = next.firstChild;

            if (next.routeConfig === null) { continue; }
            if (!next.routeConfig.path) { continue; }

            url += `/${this.createUrl(next)}`;

            if (next === route) { break; }
        }

        return url;
    }
}
