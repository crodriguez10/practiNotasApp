import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MateriasPage } from '../pages/materias/materias';
import { DocentesPage } from '../pages/docentes/docentes';
import { CarrerasPage } from '../pages/carreras/carreras';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DatabaseService } from '../providers/database-service';
import { MateriasService } from '../providers/materias-service';
import { DocentesService } from '../providers/docentes-service';
import { CarrerasService } from '../providers/carreras-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage, 
    MateriasPage,
    DocentesPage,
    CarrerasPage
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
    CarrerasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseService,
    MateriasService,
    DocentesService,
    CarrerasService
  ]
})
export class AppModule {}
