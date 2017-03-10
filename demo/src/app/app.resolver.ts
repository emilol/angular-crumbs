import {GithubService} from "./github/shared/github.service";

// an array of services to resolve routes with data
export const APP_RESOLVER_PROVIDERS = [
    GithubService
];
