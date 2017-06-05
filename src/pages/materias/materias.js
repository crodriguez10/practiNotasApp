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
import { MateriasService } from '../../providers/materias-service';
import { DatabaseService } from '../../providers/database-service';
import { CrearMateriasProfesoresPage } from '../crear-materias-profesores/crear-materias-profesores';
var MateriasPage = (function () {
    function MateriasPage(navCtrl, alertCtrl, materiasService, dataBaseService) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.materiasService = materiasService;
        this.dataBaseService = dataBaseService;
        this.materias = [];
        materiasService.setDbo(dataBaseService.getDbo());
    }
    MateriasPage.prototype.ionViewDidLoad = function () {
        this.getAllMaterias();
    };
    /*
    *Traer todas la materias
    */
    MateriasPage.prototype.getAllMaterias = function () {
        var _this = this;
        console.log("getAllmaterias");
        this.materiasService.getAll()
            .then(function (materias) {
            console.log("materias: " + materias);
            _this.materias = materias;
        });
    };
    MateriasPage.prototype.openAlertNewMateria = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Crear materia',
            message: 'escribe el nombre de la materia',
            inputs: [
                {
                    name: 'descripcion',
                    placeholder: 'Digitar nueva materia.',
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
                        data.estado_materia = 1;
                        _this.materiasService.create(data)
                            .then(function (response) {
                            //this.materias.unshift( data );
                            _this.getAllMaterias();
                            _this.goToBack();
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
    MateriasPage.prototype.deleteMateria = function (materia, index) {
        var _this = this;
        this.materiasService.delete(materia)
            .then(function (response) {
            _this.materias.splice(index, 1);
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    MateriasPage.prototype.openAlertUpdateMateria = function (materia) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Modificar materia',
            message: 'escribe el nombre de la materia',
            inputs: [
                {
                    name: 'descripcion',
                    value: materia.descripcion,
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
                        data.id_materias = materia.id_materias;
                        _this.materiasService.update(data)
                            .then(function (response) {
                            _this.getAllMaterias();
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
    MateriasPage.prototype.crearMateriaDocente = function () {
        this.navCtrl.push(CrearMateriasProfesoresPage);
    };
    MateriasPage.prototype.goToBack = function () {
        this.navCtrl.pop();
    };
    return MateriasPage;
}());
MateriasPage = __decorate([
    Component({
        selector: 'page-materias',
        templateUrl: 'materias.html'
    }),
    __metadata("design:paramtypes", [NavController,
        AlertController,
        MateriasService,
        DatabaseService])
], MateriasPage);
export { MateriasPage };
//# sourceMappingURL=materias.js.map