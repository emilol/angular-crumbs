import {GithubService} from "./github/shared/github.service";
import {BreadcrumbService} from './breadcrumb/breadcrumb.service';

// an array of services to resolve routes with data
export const APP_RESOLVER_PROVIDERS = [
    GithubService,
    BreadcrumbService,
];
