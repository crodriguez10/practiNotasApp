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
import { DocentesService } from '../../providers/docentes-service';
import { DatabaseService } from '../../providers/database-service';
/**
 * Generated class for the Docentes page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var DocentesPage = (function () {
    function DocentesPage(navCtrl, alertCtrl, dataBaseService, docentesService) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.dataBaseService = dataBaseService;
        this.docentesService = docentesService;
        this.docentes = [];
        docentesService.setDbo(dataBaseService.getDbo());
    }
    DocentesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Docentes');
        this.getAllDocentes();
    };
    /*
    *Traer todas los docentes
    */
    DocentesPage.prototype.getAllDocentes = function () {
        var _this = this;
        console.log("getAlldocentes");
        this.docentesService.getAll()
            .then(function (docentes) {
            console.log("docentes: " + docentes);
            _this.docentes = docentes;
        });
    };
    DocentesPage.prototype.openAlertNewDocente = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Registrar docente',
            message: 'escribe el nombre del docente',
            inputs: [
                {
                    name: 'nombres',
                    placeholder: 'Digitar nombre.',
                },
                {
                    name: 'primer_apellido',
                    placeholder: 'Digitar primer apellido.',
                },
                {
                    name: 'segundo_apellido',
                    placeholder: 'Digitar segundo apellido.',
                },
                {
                    name: 'contacto_telefono',
                    placeholder: 'Digitar telefono apellido.',
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
                        data.estado_docente = 1;
                        _this.docentesService.create(data)
                            .then(function (response) {
                            _this.getAllDocentes();
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
    DocentesPage.prototype.deleteDocente = function (docente, index) {
        var _this = this;
        this.docentesService.delete(docente)
            .then(function (response) {
            _this.docentes.splice(index, 1);
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    DocentesPage.prototype.openAlertUpdateDocente = function (docente, index) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Actualizar docente',
            message: 'escribe el nombre del docente',
            inputs: [
                {
                    name: 'nombres',
                    value: docente.nombres,
                    placeholder: 'Digitar nombre.'
                },
                {
                    name: 'primer_apellido',
                    value: docente.primer_apellido,
                    placeholder: 'Digitar primer apellido.'
                },
                {
                    name: 'segundo_apellido',
                    value: docente.segundo_apellido,
                    placeholder: 'Digitar segundo apellido.'
                },
                {
                    name: 'contacto_telefono',
                    value: docente.contacto_telefono,
                    placeholder: 'Digitar telefono.'
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
                        data.id_docentes = docente.id_docentes;
                        _this.docentesService.update(data)
                            .then(function (response) {
                            _this.getAllDocentes();
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
    DocentesPage.prototype.goToBack = function () {
        this.navCtrl.pop();
    };
    return DocentesPage;
}());
DocentesPage = __decorate([
    Component({
        selector: 'page-docentes',
        templateUrl: 'docentes.html',
    }),
    __metadata("design:paramtypes", [NavController, AlertController, DatabaseService, DocentesService])
], DocentesPage);
export { DocentesPage };
//# sourceMappingURL=docentes.js.map