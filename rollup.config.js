export default {
	entry: 'dist/index.js',
	dest: 'dist/bundles/angular-crumbs.umd.js',
	sourceMap: false,
	format: 'umd',
	moduleName: 'ng.angular-crumbs',
	globals: {
		'@angular/core': 'ng.core',
		'@angular/common': 'ng.common',
		'@angular/platform-browser': 'ng.platform-browser',
		'@angular/router': 'ng.router',
		'rxjs/Observable': 'Rx',
		'rxjs/ReplaySubject': 'Rx',
		'rxjs/add/operator/map': 'Rx.Observable.prototype',
		'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
		'rxjs/add/observable/fromEvent': 'Rx.Observable',
		'rxjs/add/observable/of': 'Rx.Observable'
	}
}
