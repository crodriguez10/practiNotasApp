import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Pendientes } from './pendientes';

@NgModule({
  declarations: [
    Pendientes,
  ],
  imports: [
    IonicModule.forChild(Pendientes),
  ],
  exports: [
    Pendientes
  ]
})
export class PendientesModule {}
