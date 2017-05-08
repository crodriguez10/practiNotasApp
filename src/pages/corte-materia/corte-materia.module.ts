import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CorteMateria } from './corte-materia';

@NgModule({
  declarations: [
    CorteMateria,
  ],
  imports: [
    IonicModule.forChild(CorteMateria),
  ],
  exports: [
    CorteMateria
  ]
})
export class CorteMateriaModule {}
