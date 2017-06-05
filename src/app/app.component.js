var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MateriasPage } from '../pages/materias/materias';
import { DocentesPage } from '../pages/docentes/docentes';
import { ApuntesPage } from '../pages/apuntes/apuntes';
import { PendientesPage } from '../pages/pendientes/pendientes';
import { CarrerasPage } from '../pages/carreras/carreras';
import { DatabaseService } from '../providers/database-service';
import { CalificacionesPage } from '../pages/calificaciones/calificaciones';
import { PromedioMateriasByCarrera } from '../pages/promedio-materias-by-carrera/promedio-materias-by-carrera';
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, dataBaseService) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.dataBaseService = dataBaseService;
        this.rootPage = HomePage;
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'List', component: ListPage },
            { title: 'Materias', component: MateriasPage },
            { title: 'Docentes', component: DocentesPage },
            { title: 'Apuntes', component: ApuntesPage },
            { title: 'Pendientes', component: PendientesPage },
            { title: 'Carreras', component: CarrerasPage },
            { title: 'Calificaciones', component: CalificacionesPage },
            { title: 'Promedio Materia', component: PromedioMateriasByCarrera },
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.dataBaseService.createTableMaterias();
            _this.dataBaseService.createTableDocentes();
            _this.dataBaseService.createTableApuntes();
            _this.dataBaseService.createTableCarreras();
            _this.dataBaseService.createTableCarreraMateria();
            _this.dataBaseService.createTableDocenteMateria();
            _this.dataBaseService.createTableCorte();
            _this.dataBaseService.createTableCorteMateria();
            _this.dataBaseService.createTablePendientes();
            _this.dataBaseService.createTableCalificaciones();
            _this.dataBaseService.createTableMateriaCalificacion();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen,
        DatabaseService])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map