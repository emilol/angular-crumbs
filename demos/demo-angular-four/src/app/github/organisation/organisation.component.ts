import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'angular-crumbs';
import { GithubService } from '../shared/github.service';

@Component({
  selector: 'organisation',
  templateUrl: './organisation.component.html'
})
export class OrganisationComponent {
  organisation: { name?:string, avatar_url?:string } = {};

  constructor(
    private route: ActivatedRoute,
    private github: GithubService,
    private breadcrumbService: BreadcrumbService) {
    this.searchForOrganisation(route.snapshot.params['org']);
    route.params.subscribe(params => {
      this.searchForOrganisation(params['org']);
    });
  }

  searchForOrganisation(orgName: string) {
    if (!orgName) return;

    this.github.getOrg(orgName)
      .subscribe((org) => {
        this.organisation = org;
        this.setOrganisationCrumb();
      });
  }

  setOrganisationCrumb() {
    if (!this.organisation.name) return;
    this.breadcrumbService.changeBreadcrumb(this.route.snapshot, this.organisation.name);
  }
}
