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
import { NavController, AlertController } from 'ionic-angular';
import { CarrerasService } from '../../providers/carreras-service';
import { DatabaseService } from '../../providers/database-service';
import { CrearCarreraMateriaPage } from '../crear-carrera-materia/crear-carrera-materia';
/**
 * Generated class for the carreras page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CarrerasPage = (function () {
    function CarrerasPage(navCtrl, alertCtrl, carrerasService, dataBaseService) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.carrerasService = carrerasService;
        this.dataBaseService = dataBaseService;
        this.carreras = [];
        carrerasService.setDbo(dataBaseService.getDbo());
        this.navCtrl = navCtrl;
    }
    CarrerasPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Carreras');
        this.getAllCarreras();
    };
    CarrerasPage.prototype.ionViewWillEnter = function () {
        console.log("ionViewWillEnter");
        this.getAllCarreras();
    };
    /*
    *Traer todas las carreras
    */
    CarrerasPage.prototype.getAllCarreras = function () {
        var _this = this;
        console.log("getAllCarreras");
        this.carrerasService.getAll()
            .then(function (carreras) {
            console.log("carreras: " + carreras);
            _this.carreras = carreras;
        });
    };
    CarrerasPage.prototype.openAlertNewCarrera = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Crear carrera',
            message: 'Ingresar carrera',
            inputs: [
                {
                    name: 'descripcion',
                    placeholder: 'Digitar descripcion carrera.',
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: function () {
                        console.log('cancelar');
                    }
                },
                {
                    text: 'Crear',
                    handler: function (data) {
                        data.estadoCarrera = 1;
                        _this.carrerasService.create(data)
                            .then(function (response) {
                            _this.getAllCarreras();
                        })
                            .catch(function (error) {
                            console.error(error);
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    CarrerasPage.prototype.deleteCarrera = function (carrera, index) {
        var _this = this;
        this.carrerasService.delete(carrera)
            .then(function (response) {
            _this.carreras.splice(index, 1);
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    CarrerasPage.prototype.openAlertUpdateCarrera = function (carrera) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Carreras',
            message: 'Modificar carrera',
            inputs: [
                {
                    name: 'descripcion',
                    placeholder: 'Digitar descripcion carrera.',
                    value: carrera.descripcion
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: function () {
                        console.log('cancelar');
                    }
                },
                {
                    text: 'Modificar',
                    handler: function (data) {
                        data.id_carreras = carrera.id_carreras;
                        _this.carrerasService.update(data)
                            .then(function (response) {
                            _this.getAllCarreras();
                        })
                            .catch(function (error) {
                            console.error(error);
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    CarrerasPage.prototype.crearCarrera = function () {
        this.navCtrl.push(CrearCarreraMateriaPage);
    };
    return CarrerasPage;
}());
CarrerasPage = __decorate([
    Component({
        selector: 'page-carreras',
        templateUrl: 'carreras.html',
    }),
    __metadata("design:paramtypes", [NavController,
        AlertController,
        CarrerasService,
        DatabaseService])
], CarrerasPage);
export { CarrerasPage };
//# sourceMappingURL=carreras.js.map