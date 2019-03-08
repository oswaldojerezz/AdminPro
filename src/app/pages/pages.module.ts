import { NgModule } from '@angular/core';

// rutas
import { PagesRoutingModule } from './pages.routes';

// Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations : [
        ProgressComponent,
        Graficas1Component,
        DashboardComponent,
        PagesComponent,
    ],
    exports : [
        ProgressComponent,
        Graficas1Component,
        DashboardComponent,
        PagesComponent,
    ],
    imports : [
        SharedModule,
        PagesRoutingModule
    ]
})

export class PagesModule { }
