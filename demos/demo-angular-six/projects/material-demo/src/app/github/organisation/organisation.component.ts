import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'angular-crumbs';
import { GithubService } from 'src/app/shared/github.service';

@Component({
  selector: 'organisation',
  templateUrl: './organisation.component.html'
})
export class OrganisationComponent {
  organisation: { name?:string, avatar_url?:string } = {};

  constructor(private route: ActivatedRoute, private github: GithubService, private breadcrumbService: BreadcrumbService) {
    this.searchForOrg(route.snapshot.params['org']);
    route.params.subscribe(params => {
      this.searchForOrg(params['org']);
    });
  }

  searchForOrg(orgName: string) {
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
