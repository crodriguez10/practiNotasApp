import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CarreraMateria } from './carrera-materia';

@NgModule({
  declarations: [
    CarreraMateria,
  ],
  imports: [
    IonicModule.forChild(CarreraMateria),
  ],
  exports: [
    CarreraMateria
  ]
})
export class CarreraMateriaModule {}
