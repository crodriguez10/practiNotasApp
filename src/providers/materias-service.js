var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
/*
  Generated class for the MateriasService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var MateriasService = (function () {
    function MateriasService() {
    }
    MateriasService.prototype.setDbo = function (dbo) {
        console.log("instaciar dbo");
        this.dbo = dbo;
    };
    MateriasService.prototype.getAll = function () {
        var sql = 'SELECT * FROM materias';
        console.log("consultar materias");
        return this.dbo.executeSql(sql, [])
            .then(function (response) {
            var materias = [];
            for (var index = 0; index < response.rows.length; index++) {
                materias.push(response.rows.item(index));
            }
            return Promise.resolve(materias);
        });
    };
    MateriasService.prototype.create = function (materia) {
        var _this = this;
        console.log("crear registro");
        var sql = 'INSERT INTO materias(descripcion, estado_materia) VALUES(?,?)';
        return this.dbo.executeSql(sql, [materia.descripcion, materia.estado_materia]).
            then(function (result) {
            _this.dbo.executeSql("SELECT id_materias from materias ORDER BY id_materias DESC LIMIT 1", []).then(function (response) {
                console.log("response: " + response.rows.item(0).id_materias);
                return response.rows.item(0).id_materias;
            });
        });
    };
    MateriasService.prototype.update = function (materia) {
        console.log("update materias" + materia.id_materias);
        var sql = 'UPDATE materias SET descripcion=?, estado_materia=? WHERE id_materias=?';
        return this.dbo.executeSql(sql, [materia.descripcion, materia.estado_materia, materia.id_materias]);
    };
    MateriasService.prototype.delete = function (materia) {
        var sql = 'DELETE FROM materias WHERE id_materias=?';
        return this.dbo.executeSql(sql, [materia.id_materias]);
    };
    MateriasService.prototype.materiasbyCarrera = function (id_carrera) {
        var sql = 'select distinct (materias.descripcion) as descripcion,AVG(calificaciones.nota) as promedio from materias , calificaciones , carreraMateria where materias.id_materias = calificaciones.materia and  carreraMateria.id_materia = materias.id_materias  and carreraMateria.id_carrera = ?';
        return this.dbo.executeSql(sql, [id_carrera])
            .then(function (response) {
            var materias = [];
            console.log("Response" + response.rows.length);
            for (var index = 0; index < response.rows.length; index++) {
                materias.push(response.rows.item(index));
                console.log("Item" + response.rows.item(index));
                console.log("Item" + response.rows.item(index).descripcion);
            }
            return Promise.resolve(materias);
        });
    };
    return MateriasService;
}());
MateriasService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], MateriasService);
export { MateriasService };
//# sourceMappingURL=materias-service.js.map