# Angular2 Breadcrumb

This project was forked from [angular2-seed](https://github.com/angular/angular2-seed)

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

### Usage
- Clone or fork this repository
- Make sure you have [node.js](https://nodejs.org/) installed version 5+
- Make sure you have NPM installed version 3+
- `WINDOWS ONLY` run `npm install -g webpack webpack-dev-server typescript` to install global dependencies
- run `npm install` to install dependencies
- run `npm start` to fire up dev server
- open browser to [`http://localhost:3000`](http://localhost:3000)
- if you want to use other port, open `package.json` file, then change port in `--port 3000` script
