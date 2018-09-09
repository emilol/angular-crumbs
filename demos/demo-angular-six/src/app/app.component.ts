import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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

  constructor(
    private titleService: Title,
    private breadcrumbService: BreadcrumbService,
    private github: GithubService) {
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
        this.titleService.setTitle(this.createTitle(crumbs));
        this.breadcrumbs = this.mapPrimeNgCrumbs(crumbs)
      });
  }

  get shortcuts() {
    return this.github.getShorcuts().map(s =>
        <MenuItem>{ label: s.title, icon: 'fa fa-chevron-right', routerLink: ['/github', s.id] }
    );
  }

  private createTitle(routesCollection: Breadcrumb[]) {
      const title = 'Angular Breadcrumb';
      const titles = routesCollection.filter((route) => route.displayName);

      if (!titles.length) { return title; }

      const routeTitle = this.titlesToString(titles);
      return `${routeTitle} ${title}`;
  }

  private titlesToString(titles) {
      return titles.reduce((prev, curr) => {
          return `${curr.displayName} - ${prev}`;
      }, '');
  }

  private mapPrimeNgCrumbs(crumbs: Breadcrumb[]) : MenuItem[] {
      return crumbs.map(c => <MenuItem>{ label: c.displayName, url: `#${c.url}`});
  }
}
