import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificardatosbdPage } from './modificardatosbd.page';

const routes: Routes = [
  {
    path: '',
    component: ModificardatosbdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificardatosbdPageRoutingModule {}
