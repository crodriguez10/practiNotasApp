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
import { DatabaseService } from '../../providers/database-service';
import { CalificacionesService } from '../../providers/calificaciones-service';
import { MateriasService } from '../../providers/materias-service';
import { MateriaCalificacionService } from '../../providers/materia-calificacion-service';
import { MateriasPage } from '../materias/materias';
/**
 * Generated class for the CrearCalificacionesMaterias page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CrearCalificacionesMateriasPage = (function () {
    function CrearCalificacionesMateriasPage(navController, fb, materiasService, calificacionService, dataBaseService, materiaCalificacionService) {
        this.navController = navController;
        this.fb = fb;
        this.materiasService = materiasService;
        this.calificacionService = calificacionService;
        this.dataBaseService = dataBaseService;
        this.materiaCalificacionService = materiaCalificacionService;
        this.materias = [];
        this.cortes_materias = [];
        //his.formCrearCalificacionesMaterias = this.fb.group({nota:[''],});
        this.navController = navController;
        this.validations(this.fb);
        materiasService.setDbo(dataBaseService.getDbo());
        calificacionService.setDbo(dataBaseService.getDbo());
        materiaCalificacionService.setDbo(dataBaseService.getDbo());
    }
    CrearCalificacionesMateriasPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CrearCalificacionesMaterias');
        this.getAllMaterias();
    };
    CrearCalificacionesMateriasPage.prototype.ionViewWillEnter = function () {
        console.log("ionViewWillEnter");
        this.getAllMaterias();
    };
    CrearCalificacionesMateriasPage.prototype.getAllMaterias = function () {
        var _this = this;
        console.log("getAllmaterias");
        this.materiasService.getAll()
            .then(function (materias) {
            console.log("materias: " + materias);
            _this.materias = materias;
        });
    };
    CrearCalificacionesMateriasPage.prototype.guardarMateriaCalificacion = function (data) {
        console.log("guardarMateriaCalificacion" + data);
        if (this.formCrearCalificacionesMaterias.valid) {
            console.log("****guardar materia calificacion****");
            console.log('Submitted value1: ' + data.nota);
            console.log('Submitted value2: ' + data.descripcion);
            console.log('Submitted value3: ' + data.id_materia);
            var calificacion = {
                nota: data.nota,
                descripcion: data.descripcion,
                materia: data.id_materia
            };
            console.log("calificacion: " + calificacion);
            var id_Calificacion = this.calificacionService.create(calificacion);
            console.log("id_Calificacion: " + id_Calificacion);
            var materia = {
                id_materia: data.id_materia,
                id_Calificacion: id_Calificacion
            };
            this.materiaCalificacionService.create(materia);
            this.goToBack();
        }
    };
    CrearCalificacionesMateriasPage.prototype.crearMateria = function () {
        this.navController.push(MateriasPage);
    };
    CrearCalificacionesMateriasPage.prototype.validations = function (fb) {
        this.formCrearCalificacionesMaterias = fb.group({
            'nota': ['', Validators.required],
            'id_materia': ['', Validators.required],
            'descripcion': ['', Validators.required]
        });
    };
    CrearCalificacionesMateriasPage.prototype.goToBack = function () {
        this.navController.pop();
    };
    CrearCalificacionesMateriasPage.prototype.isValidForm = function () {
        if (this.formCrearCalificacionesMaterias.valid) {
            return true;
        }
        return false;
    };
    return CrearCalificacionesMateriasPage;
}());
CrearCalificacionesMateriasPage = __decorate([
    Component({
        selector: 'page-crear-calificaciones-materias',
        templateUrl: 'crear-calificaciones-materias.html',
    }),
    __metadata("design:paramtypes", [NavController,
        FormBuilder,
        MateriasService,
        CalificacionesService,
        DatabaseService,
        MateriaCalificacionService])
], CrearCalificacionesMateriasPage);
export { CrearCalificacionesMateriasPage };
//# sourceMappingURL=crear-calificaciones-materias.js.map