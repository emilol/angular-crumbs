import { Component, Injectable, EventEmitter } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, RoutesRecognized, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";

export class Breadcrumb {
    displayName: string;
    terminal: boolean;
    url: string;
}

@Injectable()
export class BreadcrumbService {
    onBreadcrumbChange: EventEmitter<any> = new EventEmitter<Breadcrumb[]>(false);

    private breadcrumbsCollection: Breadcrumb[];

    constructor(private router: Router) {
        this.router.events.subscribe((routeEvent: RoutesRecognized) => {
            if (!routeEvent.state) return;
            let route = routeEvent.state.root;
            let url = "";

            this.breadcrumbsCollection = [];

            while (route.children.length) {
                route = route.firstChild;
                if (!route.routeConfig.path) continue;

                url += `/${this.createUrl(route)}`;

                if (!route.data["breadcrumb"]) continue;

                this.breadcrumbsCollection.push(this.createBreadcrumb(route, url));
            }

            this.onBreadcrumbChange.emit(this.breadcrumbsCollection);
        });
    }

    private createBreadcrumb(route: ActivatedRouteSnapshot, url: string): Breadcrumb {
        return {
            displayName: route.data["breadcrumb"],
            terminal: route.children.length === 0 || !route.firstChild.routeConfig.path,
            url: url
        }
    }

    private createUrl(route: ActivatedRouteSnapshot) {
        return route.url.map(s => s.toString()).join('/');
    }

    private createRootUrl(route: ActivatedRouteSnapshot) {
        let url = "";

        route = route.root;

        while (route.children.length) {
            route = route.firstChild;
            if (!route.routeConfig.path) continue;

            url += `/${this.createUrl(route)}`;
        }

        return url;
    }
}