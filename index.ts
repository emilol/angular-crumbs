import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule }   from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './src/breadcrumb.component';
import { BreadcrumbService } from './src/breadcrumb.service';

export * from './src/breadcrumb.component';
export * from './src/breadcrumb.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [BreadcrumbComponent],
    exports: [BreadcrumbComponent],
    providers: [BreadcrumbService]
})
export class BreadcrumbModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: BreadcrumbModule,
            providers: [BreadcrumbService]
        };
    }
}