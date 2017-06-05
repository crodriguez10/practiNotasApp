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
import { CorteService } from '../../providers/corte-service';
import { DatabaseService } from '../../providers/database-service';
/**
 * Generated class for the cortes page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CortesPage = (function () {
    function CortesPage(navCtrl, alertCtrl, cortesService, dataBaseService) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.cortesService = cortesService;
        this.dataBaseService = dataBaseService;
        this.cortes = [];
        cortesService.setDbo(dataBaseService.getDbo());
        this.navCtrl = navCtrl;
    }
    CortesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad cortes');
        this.getAllCortes();
    };
    /*
    *Traer todas las cortes
    */
    CortesPage.prototype.getAllCortes = function () {
        var _this = this;
        console.log("getAllcortes");
        this.cortesService.getAll()
            .then(function (cortes) {
            console.log("cortes: " + cortes);
            _this.cortes = cortes;
        });
    };
    CortesPage.prototype.openAlertNewCorte = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Crear corte',
            message: 'Ingresar corte',
            inputs: [
                {
                    name: 'descripcion',
                    placeholder: 'Digitar descripcion corte.',
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
                        data.estadoCorte = 1;
                        _this.cortesService.create(data)
                            .then(function (response) {
                            _this.getAllCortes();
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
    CortesPage.prototype.deletecorte = function (corte, index) {
        var _this = this;
        this.cortesService.delete(corte)
            .then(function (response) {
            _this.cortes.splice(index, 1);
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    CortesPage.prototype.openAlertUpdateCorte = function (corte) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'cortes',
            message: 'Modificar corte',
            inputs: [
                {
                    name: 'descripcion',
                    placeholder: 'Digitar descripcion corte.',
                    value: corte.descripcion
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
                        data.id_corte = corte.id_cortes;
                        _this.cortesService.update(data)
                            .then(function (response) {
                            _this.getAllCortes();
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
    CortesPage.prototype.goToBack = function () {
        this.navCtrl.pop();
    };
    return CortesPage;
}());
CortesPage = __decorate([
    Component({
        selector: 'page-cortes',
        templateUrl: 'cortes.html',
    }),
    __metadata("design:paramtypes", [NavController,
        AlertController,
        CorteService,
        DatabaseService])
], CortesPage);
export { CortesPage };
//# sourceMappingURL=cortes.js.map