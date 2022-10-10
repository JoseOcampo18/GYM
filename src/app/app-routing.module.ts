import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { MainComponent } from './main/main.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { ClientesComponent } from './clientes/clientes.component';
import { AparatosComponent } from './aparatos/aparatos.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'accessDenied',
    loadChildren: () =>
      import('./access/access.module').then((m) => m.AccessModule),
  },

  {
    path: 'adminDashboard',
    component: AppLayoutComponent,
    children: [
      /* { path: 'vacio', component: MainComponent}, */
      { path: '', component: ClientesComponent },
      { path: 'empleados', component: EmpleadosComponent },
      { path: 'aparatos', component: AparatosComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
