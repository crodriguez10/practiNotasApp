import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Carreras } from './carreras';

@NgModule({
  declarations: [
    Carreras,
  ],
  imports: [
    IonicModule.forChild(Carreras),
  ],
  exports: [
    Carreras
  ]
})
export class CarrerasModule {}
