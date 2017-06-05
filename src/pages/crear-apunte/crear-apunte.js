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
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { MateriasService } from '../../providers/materias-service';
import { DatabaseService } from '../../providers/database-service';
import { ApuntesService } from '../../providers/apuntes-service';
import { Camera } from '@ionic-native/camera';
/**
 * Generated class for the CrearApunte page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CrearApuntePage = (function () {
    function CrearApuntePage(navController, fb, materiasService, dataBaseService, apuntesService, camera) {
        this.navController = navController;
        this.fb = fb;
        this.materiasService = materiasService;
        this.dataBaseService = dataBaseService;
        this.apuntesService = apuntesService;
        this.camera = camera;
        this.materias = [];
        this.image = null;
        this.navController = navController;
        this.validations(this.fb);
        materiasService.setDbo(dataBaseService.getDbo());
        apuntesService.setDbo(dataBaseService.getDbo());
    }
    CrearApuntePage.prototype.ionViewDidLoad = function () {
        this.getAllMaterias();
    };
    CrearApuntePage.prototype.getAllMaterias = function () {
        var _this = this;
        console.log("getAllmaterias");
        this.materiasService.getAll()
            .then(function (materias) {
            console.log("materias: " + materias);
            _this.materias = materias;
        });
    };
    CrearApuntePage.prototype.guardarApunte = function (data) {
        if (this.formCrearApunte.valid) {
            console.log('Submitted value: ' + data.descripcion);
            data.estado_apunte = 1;
            data.adjunto = this.image;
            this.apuntesService.create(data);
            this.goToBack();
        }
    };
    CrearApuntePage.prototype.validations = function (fb) {
        this.formCrearApunte = fb.group({
            'id_materia': ['', Validators.required],
            'descripcion': ['', Validators.required]
        });
    };
    CrearApuntePage.prototype.goToBack = function () {
        this.navController.pop();
    };
    CrearApuntePage.prototype.getPicture = function () {
        var _this = this;
        var options = {
            destinationType: this.camera.DestinationType.FILE_URI
        };
        this.camera.getPicture(options)
            .then(function (imageData) {
            _this.image = imageData;
            console.log("imageData: " + imageData);
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    CrearApuntePage.prototype.isValidForm = function () {
        if (this.formCrearApunte.valid && this.image != null) {
            return true;
        }
        return false;
    };
    return CrearApuntePage;
}());
CrearApuntePage = __decorate([
    Component({
        templateUrl: 'crear-apunte.html',
    }),
    __metadata("design:paramtypes", [NavController, FormBuilder,
        MateriasService,
        DatabaseService,
        ApuntesService,
        Camera])
], CrearApuntePage);
export { CrearApuntePage };
//# sourceMappingURL=crear-apunte.js.map