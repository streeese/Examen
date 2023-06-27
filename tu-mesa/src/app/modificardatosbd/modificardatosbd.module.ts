import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificardatosbdPageRoutingModule } from './modificardatosbd-routing.module';

import { ModificardatosbdPage } from './modificardatosbd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificardatosbdPageRoutingModule
  ],
  declarations: [ModificardatosbdPage]
})
export class ModificardatosbdPageModule {}
