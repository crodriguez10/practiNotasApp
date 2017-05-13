import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MateriasPage } from '../pages/materias/materias';
import { DocentesPage } from '../pages/docentes/docentes';
import { ApuntesPage } from '../pages/apuntes/apuntes';
import { PendientesPage } from '../pages/pendientes/pendientes';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DatabaseService } from '../providers/database-service';
import { MateriasService } from '../providers/materias-service';
import { DocentesService } from '../providers/docentes-service';
import { ApuntesService } from '../providers/apuntes-service';
import { CarrerasService } from '../providers/carreras-service';
import { CarreraMateriaService } from '../providers/carrera-materia-service';
import { CorteService } from '../providers/corte-service';
import { CorteMateriaService } from '../providers/corte-materia-service';
import { DocenteMateriaService } from '../providers/docente-materia-service';
import { PendientesService } from '../providers/pendientes-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage, 
    MateriasPage,
    DocentesPage,
    ApuntesPage,
    PendientesPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MateriasPage,
    DocentesPage,
    ApuntesPage,
    PendientesPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseService,
    MateriasService,
    DocentesService,
    ApuntesService,
    CarrerasService,
    CarreraMateriaService,
    CorteService,
    CorteMateriaService,
    DocenteMateriaService,
    PendientesService
  ]
})
export class AppModule {}
