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
import { Validators, FormBuilder } from '@angular/forms';
import { DatabaseService } from '../../providers/database-service';
import { MateriasService } from '../../providers/materias-service';
import { CarrerasService } from '../../providers/carreras-service';
import { CarreraMateriaService } from '../../providers/carrera-materia-service';
import { MateriasPage } from '../materias/materias';
/**
 * Generated class for the CrearCarreraMateria page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CrearCarreraMateriaPage = (function () {
    function CrearCarreraMateriaPage(navCtrl, navParams, dataBaseService, materiasService, carrerasService, carreraMateriaService, fb) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataBaseService = dataBaseService;
        this.materiasService = materiasService;
        this.carrerasService = carrerasService;
        this.carreraMateriaService = carreraMateriaService;
        this.fb = fb;
        this.materias = [];
        this.navCtrl = navCtrl;
        materiasService.setDbo(dataBaseService.getDbo());
        carreraMateriaService.setDbo(dataBaseService.getDbo());
        this.validations(this.fb);
    }
    CrearCarreraMateriaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CrearCarreraMateria');
        this.getAllMaterias();
    };
    CrearCarreraMateriaPage.prototype.ionViewWillEnter = function () {
        console.log("ionViewWillEnter");
        this.getAllMaterias();
    };
    /*
      *Traer todas la materias
      */
    CrearCarreraMateriaPage.prototype.getAllMaterias = function () {
        var _this = this;
        console.log("getAllmaterias");
        this.materiasService.getAll()
            .then(function (materias) {
            console.log("materias: " + materias);
            _this.materias = materias;
        });
    };
    CrearCarreraMateriaPage.prototype.validations = function (fb) {
        this.formCrearCarreraMateria = fb.group({
            'id_materia': ['', Validators.required],
            'descripcion': ['', Validators.required]
        });
    };
    CrearCarreraMateriaPage.prototype.isValidForm = function () {
        if (this.formCrearCarreraMateria.valid) {
            return true;
        }
        return false;
    };
    CrearCarreraMateriaPage.prototype.guardarCarreraMateria = function (data) {
        console.log("guardarCarreraMateria" + data);
        if (this.formCrearCarreraMateria.valid) {
            var carrera = {
                descripcion: data.descripcion,
                estadoCarrera: 1
            };
            var id_carrera = this.carrerasService.create(carrera);
            console.log("data.id_materia.length: " + data.id_materia.length);
            for (var i = 0; i < data.id_materia.length; i++) {
                console.log("data.id_materia[i]: " + data.id_materia[i]);
                var carreraMateria = {
                    id_carrera: id_carrera,
                    id_materia: data.id_materia[i],
                    estadoCarreraMateria: 1
                };
                this.carreraMateriaService.create(carreraMateria);
            }
            this.goToBack();
        }
    };
    CrearCarreraMateriaPage.prototype.crearMateria = function () {
        this.navCtrl.push(MateriasPage);
    };
    CrearCarreraMateriaPage.prototype.goToBack = function () {
        this.navCtrl.pop();
    };
    return CrearCarreraMateriaPage;
}());
CrearCarreraMateriaPage = __decorate([
    Component({
        selector: 'page-crear-carrera-materia',
        templateUrl: 'crear-carrera-materia.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        DatabaseService,
        MateriasService,
        CarrerasService,
        CarreraMateriaService,
        FormBuilder])
], CrearCarreraMateriaPage);
export { CrearCarreraMateriaPage };
//# sourceMappingURL=crear-carrera-materia.js.map