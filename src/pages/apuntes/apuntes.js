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
import { ApuntesService } from '../../providers/apuntes-service';
import { DatabaseService } from '../../providers/database-service';
import { CrearApuntePage } from '../crear-apunte/crear-apunte';
import { VisualizarApuntesPage } from '../visualizar-apuntes/visualizar-apuntes';
/**
 * Generated class for the Apuntes page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ApuntesPage = (function () {
    function ApuntesPage(navCtrl, alertCtrl, apuntesService, dataBaseService) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.apuntesService = apuntesService;
        this.dataBaseService = dataBaseService;
        this.apuntes = [];
        apuntesService.setDbo(dataBaseService.getDbo());
        this.navCtrl = navCtrl;
    }
    ApuntesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Apuntes');
        this.getAllApuntes();
    };
    ApuntesPage.prototype.ionViewWillEnter = function () {
        console.log("ionViewWillEnter");
        this.getAllApuntes();
    };
    /*
    *Traer todas la materias
    */
    ApuntesPage.prototype.getAllApuntes = function () {
        var _this = this;
        console.log("getAllApuntes");
        this.apuntesService.getAll()
            .then(function (apuntes) {
            console.log("apuntes: " + apuntes);
            _this.apuntes = apuntes;
        });
    };
    ApuntesPage.prototype.openAlertNewApuntes = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Crear Apuntes',
            message: 'escribe el nombre de la apuntes',
            inputs: [
                {
                    name: 'id_apunte',
                    placeholder: 'Digitar id .',
                },
                {
                    name: 'descripcion',
                    placeholder: 'Digitar descripcion apunte.',
                },
                {
                    name: 'apunte',
                    placeholder: 'Ingresar apunte.',
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
                        data.estado_apunte = 1;
                        _this.apuntesService.create(data)
                            .then(function (response) {
                            //this.materias.unshift( data );
                            _this.getAllApuntes();
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
    ApuntesPage.prototype.crearApuntes = function () {
        this.navCtrl.push(CrearApuntePage);
    };
    ApuntesPage.prototype.deleteApunte = function (apunte, index) {
        var _this = this;
        this.apuntesService.delete(apunte)
            .then(function (response) {
            _this.apuntes.splice(index, 1);
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    ApuntesPage.prototype.visualizarApunte = function (id_apuntes) {
        this.navCtrl.push(VisualizarApuntesPage, {
            id_apunte: id_apuntes
        });
    };
    return ApuntesPage;
}());
ApuntesPage = __decorate([
    Component({
        selector: 'page-apuntes',
        templateUrl: 'apuntes.html',
    }),
    __metadata("design:paramtypes", [NavController,
        AlertController,
        ApuntesService,
        DatabaseService])
], ApuntesPage);
export { ApuntesPage };
//# sourceMappingURL=apuntes.js.map