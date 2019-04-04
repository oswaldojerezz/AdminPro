import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// rutas
import { PagesRoutingModule } from './pages.routes';

// Ngcharts
import { ChartsModule } from 'ng2-charts';

// Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';


@NgModule({
    declarations : [
        ProgressComponent,
        Graficas1Component,
        DashboardComponent,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        RxjsComponent
    ],
    exports : [
        ProgressComponent,
        Graficas1Component,
        DashboardComponent,
        PagesComponent
    ],
    imports : [
        SharedModule,
        PagesRoutingModule,
        FormsModule,
        ChartsModule
    ]
})

export class PagesModule { }
