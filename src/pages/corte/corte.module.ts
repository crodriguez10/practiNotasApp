import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Corte } from './corte';

@NgModule({
  declarations: [
    Corte,
  ],
  imports: [
    IonicModule.forChild(Corte),
  ],
  exports: [
    Corte
  ]
})
export class CorteModule {}
