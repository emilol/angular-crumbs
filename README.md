# Angular2 Breadcrumb

blog post at [emilol.com](http://emilol.com/angular-2-breadcrumb-component/)

## How it works

The component adds a breadcrumb based on adding `breadcrumb` data properties to your routes in `app.route.ts`:

	export const rootRouterConfig: Routes = [  
	  {path: '', redirectTo: 'home', pathMatch: 'full'},  
	  {path: 'home', component: HomeComponent, data: { breadcrumb: 'Home'}},  
	  {path: 'about', component: AboutComponent, data: { breadcrumb: 'About'}},  
	  {path: 'github', component: RepoBrowserComponent, data: { breadcrumb: 'GitHub'},  
	    children: [  
	      {path: '', component: RepoListComponent},  
	      {path: ':org', component: RepoListComponent, data: { breadcrumb: 'Repo List'},  
	        children: [  
	          {path: '', component: RepoDetailComponent},  
	          {path: ':repo', component: RepoDetailComponent, data: { breadcrumb: 'Repo'}}  
	        ]  
	      }]  
	  }  
	];  

![Breadcrumb Demo](http://imgur.com/S2PSW3W.png)
