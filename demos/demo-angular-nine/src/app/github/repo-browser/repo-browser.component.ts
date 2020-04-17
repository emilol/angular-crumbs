import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GithubService } from 'src/app/shared/github.service';

@Component({
  selector: 'repo-browser',
  templateUrl: './repo-browser.component.html',
  styleUrls: ['./repo-browser.component.css']
})
export class RepoBrowserComponent {

  constructor(private router: Router, private github: GithubService) {
  }

  searchForOrganisation(orgName: string) {
    this.github.getOrg(orgName)
      .subscribe((org) => {
        this.router.navigate(['/github', org.login]);
      });
  }

}
