import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import { BreadcrumbService, Breadcrumb } from 'angular-crumbs';
import { GithubService } from './shared/github.service';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  items: MenuItem[];
  menuBarItems: MenuItem[];
  breadcrumbs: MenuItem[];

  constructor(private breadcrumbService: BreadcrumbService, private github: GithubService) {

  }

  ngOnInit() {
      this.menuBarItems = [
        { icon: 'fa fa-home', routerLink: ['/home'] },
        { label: 'Other Demos', routerLink: ['/home'] },
      ];
      this.items = [
        { label: 'Home', routerLink: ['/home'] },
        { label: 'About', routerLink: ['/about'] },
        { label: 'GitHub', routerLink: ['/github'] }
      ];

      this.items = this.items.concat(this.shortcuts);

      this.breadcrumbService.breadcrumbChanged.subscribe(crumbs => {
        this.breadcrumbs = this.mapPrimeNgCrumbs(crumbs)
      });
  }

  get shortcuts() {
    return this.github.getShorcuts().map(s =>
        <MenuItem>{ label: s.title, icon: 'fa fa-chevron-right', routerLink: ['/github', s.id] }
    );
  }

  private mapPrimeNgCrumbs(crumbs: Breadcrumb[]) : MenuItem[] {
      return crumbs.map(c => <MenuItem>{ label: c.displayName, url: `#${c.url}`});
  }
}
