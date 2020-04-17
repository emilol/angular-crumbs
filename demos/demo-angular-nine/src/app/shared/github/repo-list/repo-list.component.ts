import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { GithubService } from 'src/app/shared/github.service';

@Component({
  selector: 'repo-list',
  styleUrls: ['./repo-list.component.css'],
  templateUrl: './repo-list.component.html',
})
export class RepoListComponent implements OnInit {
  org: string;
  repos: Observable<any>;

  constructor(
    public github: GithubService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.org = params['org'];
      if (this.org) {
        this.repos = this.github.getReposForOrg(this.org);
      }
    });
  }
}
