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
import { DocentesService } from '../../providers/docentes-service';
import { MateriasService } from '../../providers/materias-service';
import { CorteMateriaService } from '../../providers/corte-materia-service';
import { DocenteMateriaService } from '../../providers/docente-materia-service';
import { DocentesPage } from '../docentes/docentes';
import { CorteService } from '../../providers/corte-service';
/**
 * Generated class for the CrearMateriasProfesores page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CrearMateriasProfesoresPage = (function () {
    function CrearMateriasProfesoresPage(navCtrl, dataBaseService, materiasService, docentesService, docenteMateriaService, corteMateriaService, cortesService, fb) {
        this.navCtrl = navCtrl;
        this.dataBaseService = dataBaseService;
        this.materiasService = materiasService;
        this.docentesService = docentesService;
        this.docenteMateriaService = docenteMateriaService;
        this.corteMateriaService = corteMateriaService;
        this.cortesService = cortesService;
        this.fb = fb;
        this.docentes = [];
        this.cortes = [];
        this.navCtrl = navCtrl;
        this.validations(this.fb);
        materiasService.setDbo(dataBaseService.getDbo());
        docentesService.setDbo(dataBaseService.getDbo());
        docenteMateriaService.setDbo(dataBaseService.getDbo());
        corteMateriaService.setDbo(dataBaseService.getDbo());
    }
    CrearMateriasProfesoresPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CrearMateriasProfesores');
        this.getAllDocentes();
        this.getAllCortes();
    };
    CrearMateriasProfesoresPage.prototype.ionViewWillEnter = function () {
        console.log("ionViewWillEnter");
        this.getAllDocentes();
        this.getAllCortes();
    };
    /*
    *Traer todas los docentes
    */
    CrearMateriasProfesoresPage.prototype.getAllDocentes = function () {
        var _this = this;
        console.log("getAlldocentes");
        this.docentesService.getAll()
            .then(function (docentes) {
            console.log("docentes: " + docentes);
            _this.docentes = docentes;
        });
    };
    /*
    *Traer todas las cortes
    */
    CrearMateriasProfesoresPage.prototype.getAllCortes = function () {
        var _this = this;
        console.log("getAllcortes");
        this.cortesService.getAll()
            .then(function (cortes) {
            console.log("cortes: " + cortes);
            _this.cortes = cortes;
        });
    };
    CrearMateriasProfesoresPage.prototype.validations = function (fb) {
        this.formCrearMateriaProfesor = fb.group({
            'id_docente': ['', Validators.required],
            'descripcion': ['', Validators.required],
            'id_cortes': ['', Validators.required]
        });
    };
    CrearMateriasProfesoresPage.prototype.isValidForm = function () {
        if (this.formCrearMateriaProfesor.valid) {
            return true;
        }
        return false;
    };
    CrearMateriasProfesoresPage.prototype.guardarMateriaDocente = function (data) {
        console.log("guardarMateriaDocente" + data);
        if (this.formCrearMateriaProfesor.valid) {
            console.log("guardar materia docente");
            var materia = {
                descripcion: data.descripcion,
                estado_materia: 1
            };
            console.log("materia: " + materia);
            var id_Materia = this.materiasService.create(materia);
            console.log("id_Materia: " + id_Materia);
            var docente = {
                id_docente: data.id_docente,
                id_Materia: id_Materia,
                estado_docente: 1
            };
            this.docenteMateriaService.create(docente);
            console.log("data.id_cortes.length : " + data.id_cortes.length);
            for (var i = 0; i < data.id_cortes.length; i++) {
                console.log("data.id_cortes.length[i] : " + data.id_cortes.length[i]);
                var corteMateria = {
                    id_corte: data.id_cortes[i],
                    id_materia: id_Materia,
                    estadoCorteMateria: 1
                };
                this.corteMateriaService.create(corteMateria);
            }
            this.goToBack();
        }
    };
    CrearMateriasProfesoresPage.prototype.crearDocente = function () {
        this.navCtrl.push(DocentesPage);
    };
    CrearMateriasProfesoresPage.prototype.crearCorte = function () {
        this.navCtrl.push(DocentesPage);
    };
    CrearMateriasProfesoresPage.prototype.goToBack = function () {
        this.navCtrl.pop();
    };
    return CrearMateriasProfesoresPage;
}());
CrearMateriasProfesoresPage = __decorate([
    Component({
        selector: 'page-crear-materias-profesores',
        templateUrl: 'crear-materias-profesores.html',
    }),
    __metadata("design:paramtypes", [NavController,
        DatabaseService,
        MateriasService,
        DocentesService,
        DocenteMateriaService,
        CorteMateriaService,
        CorteService,
        FormBuilder])
], CrearMateriasProfesoresPage);
export { CrearMateriasProfesoresPage };
//# sourceMappingURL=crear-materias-profesores.js.map