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
        console.log("crear registro");
        var sql = 'INSERT INTO materias(descripcion, estado_materia) VALUES(?,?)';
        return this.dbo.executeSql(sql, [materia.descripcion, materia.estado_materia]);
    };
    MateriasService.prototype.update = function (materia) {
        var sql = 'UPDATE materias SET descripcion=?, estado_materia=? WHERE id=?';
        return this.dbo.executeSql(sql, [materia.descripcion, materia.estado_materia, materia.id]);
    };
    MateriasService.prototype.delete = function (materia) {
        var sql = 'DELETE FROM materias WHERE id=?';
        return this.dbo.executeSql(sql, [materia.id]);
    };
    return MateriasService;
}());
MateriasService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], MateriasService);
export { MateriasService };
//# sourceMappingURL=materias-service.js.map