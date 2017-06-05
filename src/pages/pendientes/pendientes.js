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
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PendientesService } from '../../providers/pendientes-service';
import { DatabaseService } from '../../providers/database-service';
import { CrearPendientePage } from '../crear-pendiente/crear-pendiente';
/**
 * Generated class for the Pendientes page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
var PendientesPage = (function () {
    function PendientesPage(navCtrl, alertCtrl, dataBaseService, pendientesService) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.dataBaseService = dataBaseService;
        this.pendientesService = pendientesService;
        this.pendientes = [];
        pendientesService.setDbo(dataBaseService.getDbo());
        this.navCtrl = navCtrl;
    }
    PendientesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Pendientes');
        this.getAllPendientes();
    };
    PendientesPage.prototype.ionViewWillEnter = function () {
        console.log("ionViewWillEnter");
        this.getAllPendientes();
    };
    /*
    *Traer todas los pendientes
    */
    PendientesPage.prototype.getAllPendientes = function () {
        var _this = this;
        console.log("getAllPendientes");
        this.pendientesService.getAll()
            .then(function (pendientes) {
            console.log("pendientes: " + pendientes);
            _this.pendientes = pendientes;
        });
    };
    PendientesPage.prototype.openAlertNewPendiente = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Registrar pendiente',
            message: 'escribe el nombre del pendiente',
            inputs: [
                /* {
                   name: 'id_materia',
                   placeholder: 'Digitar Materia.',
                 },*/
                {
                    name: 'descripcion',
                    placeholder: 'Digitar Descripcion.',
                },
                {
                    name: 'fechaEvento',
                    placeholder: 'Digitar Fecha.',
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
                        data.estado_pendiente = 1;
                        _this.pendientesService.create(data)
                            .then(function (response) {
                            _this.getAllPendientes();
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
    PendientesPage.prototype.crearPendientes = function () {
        this.navCtrl.push(CrearPendientePage);
    };
    PendientesPage.prototype.deletePendiente = function (pendiente, index) {
        var _this = this;
        this.pendientesService.delete(pendiente)
            .then(function (response) {
            _this.pendientes.splice(index, 1);
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    return PendientesPage;
}());
PendientesPage = __decorate([
    Component({
        selector: 'page-pendientes',
        templateUrl: 'pendientes.html',
    }),
    __metadata("design:paramtypes", [NavController,
        AlertController,
        DatabaseService,
        PendientesService])
], PendientesPage);
export { PendientesPage };
//# sourceMappingURL=pendientes.js.map