var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MateriasService } from '../../providers/materias-service';
import { CarrerasService } from '../../providers/carreras-service';
import { DatabaseService } from '../../providers/database-service';
/**
 * Generated class for the PromedioMateriasByCarrera page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PromedioMateriasByCarrera = (function () {
    function PromedioMateriasByCarrera(navCtrl, navParams, materiasService, carrerasService, dataBaseService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.materiasService = materiasService;
        this.carrerasService = carrerasService;
        this.dataBaseService = dataBaseService;
        this.carreras = [];
        this.materias = [];
        materiasService.setDbo(dataBaseService.getDbo());
        carrerasService.setDbo(dataBaseService.getDbo());
    }
    PromedioMateriasByCarrera.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PromedioMateriasByCarrera');
        this.getAllCarreras();
    };
    PromedioMateriasByCarrera.prototype.buscarMaterias = function () {
        var _this = this;
        this.materiasService.materiasbyCarrera(this.id_Carrera)
            .then(function (materias) {
            console.log("materias: " + materias);
            _this.materias = materias;
        });
    };
    PromedioMateriasByCarrera.prototype.getAllCarreras = function () {
        var _this = this;
        console.log("getAllCarreras");
        this.carrerasService.getAll()
            .then(function (carreras) {
            console.log("carreras: " + carreras);
            _this.carreras = carreras;
        });
    };
    return PromedioMateriasByCarrera;
}());
PromedioMateriasByCarrera = __decorate([
    Component({
        selector: 'page-promedio-materias-by-carrera',
        templateUrl: 'promedio-materias-by-carrera.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams,
        MateriasService, CarrerasService,
        DatabaseService])
], PromedioMateriasByCarrera);
export { PromedioMateriasByCarrera };
//# sourceMappingURL=promedio-materias-by-carrera.js.map