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
import { ApuntesService } from '../../providers/apuntes-service';
import { DatabaseService } from '../../providers/database-service';
/**
 * Generated class for the VisualizarApuntes page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var VisualizarApuntesPage = (function () {
    function VisualizarApuntesPage(navCtrl, navParams, dataBaseService, apuntesService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataBaseService = dataBaseService;
        this.apuntesService = apuntesService;
        this.id_apunte = navParams.get('id_apunte');
        console.log("id_apunte param: " + this.id_apunte);
        this.apuntesService.setDbo(dataBaseService.getDbo());
    }
    VisualizarApuntesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VisualizarApuntes');
        this.getApunteById();
    };
    VisualizarApuntesPage.prototype.getApunteById = function () {
        var _this = this;
        console.log("getAllApuntes");
        this.apuntesService.getApunteById(this.id_apunte)
            .then(function (apunte) {
            console.log("apunte: " + apunte);
            _this.apunte = apunte;
            _this.image = apunte.adjunto;
            _this.descripcion_apunte = apunte.descripcion_apunte;
            _this.descripcion_materia = apunte.descripcion_materia;
        });
    };
    return VisualizarApuntesPage;
}());
VisualizarApuntesPage = __decorate([
    Component({
        selector: 'page-visualizar-apuntes',
        templateUrl: 'visualizar-apuntes.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        DatabaseService,
        ApuntesService])
], VisualizarApuntesPage);
export { VisualizarApuntesPage };
//# sourceMappingURL=visualizar-apuntes.js.map