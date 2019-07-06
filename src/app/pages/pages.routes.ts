import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard , AdminGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
          // Generales
          { path: 'dashboard', component: DashboardComponent , data: { titulo: 'Dashboard' } },
          { path: 'progress', component: ProgressComponent  , data: { titulo: 'Progress' }  },
          { path: 'graficas1', component: Graficas1Component , data: { titulo: 'Graficas' }  },
          { path: 'rxjs', component: RxjsComponent , data: { titulo: 'Rxjs' }  },
          { path: 'account-settings', component: AccountSettingsComponent , data: { titulo: 'Ajustes Del Tema' }  },
          { path: 'profile', component: ProfileComponent , data: { titulo: 'Perfil de Usuario' }  },
          { path: 'busqueda/:termino', component: BusquedaComponent , data: { titulo: 'Buscador' }  },
          // Mantenimientos
          { path: 'usuarios', canActivate: [AdminGuard] , component: UsuariosComponent , data: { titulo: 'Mantenimiento de usuarios' }  },
          { path: 'hospitales', component: HospitalesComponent , data: { titulo: 'Mantenimiento de Hospitales' }  },
          { path: 'medicos', component: MedicosComponent , data: { titulo: 'Mantenimiento de Medicos' }  },
          { path: 'medico/:id', component: MedicoComponent , data: { titulo: 'Actualizar Medico' }  },
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
      },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class PagesRoutingModule { }