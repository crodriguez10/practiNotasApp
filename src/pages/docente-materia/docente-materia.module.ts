import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DocenteMateria } from './docente-materia';

@NgModule({
  declarations: [
    DocenteMateria,
  ],
  imports: [
    IonicModule.forChild(DocenteMateria),
  ],
  exports: [
    DocenteMateria
  ]
})
export class DocenteMateriaModule {}
