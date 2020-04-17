import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class GithubService {
  constructor(private http: HttpClient) {}

  getOrg(org: string) {
    return this.makeRequest(`orgs/${org}`) as any;
  }

  getReposForOrg(org: string) {
    return this.makeRequest(`orgs/${org}/repos`) as any;
  }

  getRepoForOrg(org: string, repo: string) {
    return this.makeRequest(`repos/${org}/${repo}`) as any;
  }

  getShorcuts() {
      return [
          { title: "Angular Repos", id: "angular" },
          { title: "Bootstrap Repos", id: "twbs" },
          { title: "PrimeFaces Repos", id: "primefaces" }
      ];
  }

  private makeRequest(path: string) {
    let params = new URLSearchParams();
    params.set('per_page', '100');

    let url = `https://api.github.com/${ path }`;
    let httpParams = new HttpParams().append('search', params.toString());
    return this.http.get(url, {params: httpParams});
  }
}
