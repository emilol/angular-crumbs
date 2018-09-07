import { Route } from "@angular/router";

export class Breadcrumb {
    displayName: string;
    terminal: boolean;
    url: string;
    route: Route | null;
}
