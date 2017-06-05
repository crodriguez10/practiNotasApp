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
/*import { IonicPage, NavController, NavParams } from 'ionic-angular';*/
import { CalificacionesService } from '../../providers/calificaciones-service';
import { DatabaseService } from '../../providers/database-service';
import { CrearCalificacionesMateriasPage } from '../crear-calificaciones-materias/crear-calificaciones-materias';
//@IonicPage()
var CalificacionesPage = (function () {
    function CalificacionesPage(navCtrl, alertCtrl, calificacionesService, dataBaseService) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.calificacionesService = calificacionesService;
        this.dataBaseService = dataBaseService;
        this.calificaciones = [];
        calificacionesService.setDbo(dataBaseService.getDbo());
        this.navCtrl = navCtrl;
    }
    CalificacionesPage.prototype.ionViewDidLoad = function () {
        this.getAllCalificaciones();
    };
    CalificacionesPage.prototype.getAllCalificaciones = function () {
        var _this = this;
        console.log("getAllcalificaciones");
        this.calificacionesService.buscar()
            .then(function (calificaciones) {
            console.log("calificaciones: *********************" + calificaciones);
            _this.calificaciones = calificaciones;
        });
    };
    CalificacionesPage.prototype.openAlertNewCalificacion = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Crear calificacion',
            //message: 'escribe la nota',
            inputs: [
                {
                    name: 'nota',
                    placeholder: 'Digitar la calificacion.',
                },
                {
                    name: 'descripcion',
                    placeholder: 'Digitar la descripcion.',
                } /*,
                {
                  name: 'materia',
                  placeholder: 'Digitar la materia de la nota.',
                }*/
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
                        //data.estado_materia = 1; ----ESTO Q ?????
                        _this.calificacionesService.create(data)
                            .then(function (response) {
                            //this.materias.unshift( data );
                            _this.getAllCalificaciones();
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
    CalificacionesPage.prototype.deleteCalificacion = function (calificacion, index) {
        var _this = this;
        this.calificacionesService.delete(calificacion)
            .then(function (response) {
            _this.calificaciones.splice(index, 1);
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    CalificacionesPage.prototype.openAlertUpdateCalificacion = function (calificacion) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Modificar calificacion',
            message: 'escribe el nombre de la materia',
            inputs: [
                {
                    name: 'nota',
                    value: calificacion.nota,
                    placeholder: 'Digitar la calificacion.',
                },
                {
                    name: 'descripcion',
                    value: calificacion.descripcion,
                    placeholder: 'Digitar la descripcion.',
                },
                {
                    name: 'materia',
                    value: calificacion.materia,
                    placeholder: 'Digitar la materia de la nota.',
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
                        data.id_calificaciones = calificacion.id_calificaciones;
                        _this.calificacionesService.update(data)
                            .then(function (response) {
                            _this.getAllCalificaciones();
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
    CalificacionesPage.prototype.crearCalificacionMateria = function () {
        console.log("abrir calificacion");
        this.navCtrl.push(CrearCalificacionesMateriasPage);
    };
    return CalificacionesPage;
}());
CalificacionesPage = __decorate([
    Component({
        selector: 'page-calificaciones',
        templateUrl: 'calificaciones.html',
    }),
    __metadata("design:paramtypes", [NavController,
        AlertController,
        CalificacionesService,
        DatabaseService])
], CalificacionesPage);
export { CalificacionesPage };
//# sourceMappingURL=calificaciones.js.map