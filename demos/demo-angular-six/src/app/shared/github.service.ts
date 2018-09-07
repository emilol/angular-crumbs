import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class GithubService {
  constructor(private http: Http) {}

  getOrg(org: string) {
    return this.makeRequest(`orgs/${org}`);
  }

  getReposForOrg(org: string) {
    return this.makeRequest(`orgs/${org}/repos`);
  }

  getRepoForOrg(org: string, repo: string) {
    return this.makeRequest(`repos/${org}/${repo}`);
  }

  private makeRequest(path: string) {
    let params = new URLSearchParams();
    params.set('per_page', '100');

    let url = `https://api.github.com/${ path }`;
    return this.http.get(url, {search: params})
      .pipe(map(res => res.json()));
  }
}
