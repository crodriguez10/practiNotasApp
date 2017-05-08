import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MateriasPage } from '../pages/materias/materias';
import { DocentesPage } from '../pages/docentes/docentes';
import { CarrerasPage } from '../pages/carreras/carreras';
import { CarreraMateriaPage } from '../pages/carrera-materia/carrera-materia';
import { CortePage } from '../pages/corte/corte';
import { CorteMateriaPage } from '../pages/corte-materia/corte-materia';
import { DocenteMateriaPage } from '../pages/docente-materia/docente-materia';
import { PendientesPage } from '../pages/pendientes/pendientes';

import { DatabaseService } from '../providers/database-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public dataBaseService: DatabaseService
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Materias', component: MateriasPage } ,
      { title: 'Docentes', component: DocentesPage } ,
      { title: 'Carreras', component: CarrerasPage } ,
      { title: 'CarreraMateria', component: CarreraMateriaPage } ,
      { title: 'DocenteMateria', component: DocenteMateriaPage } ,
      { title: 'Corte', component: CortePage } ,
      { title: 'CorteMateria', component: CorteMateriaPage } ,
      { title: 'Pendientes', component: PendientesPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.dataBaseService.createTableMaterias();
      this.dataBaseService.createTableDocentes();
      this.dataBaseService.createTableCarreras();
      this.dataBaseService.createTableCarreraMateria();
      this.dataBaseService.createTableDocenteMateria();
      this.dataBaseService.createTableCorte();
      this.dataBaseService.createTableCorteMateria();
      this.dataBaseService.createTablePendientes();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
