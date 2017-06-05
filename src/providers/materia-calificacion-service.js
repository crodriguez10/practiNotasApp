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
  Generated class for the MateriaCalificacionService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var MateriaCalificacionService = (function () {
    function MateriaCalificacionService() {
    }
    MateriaCalificacionService.prototype.setDbo = function (dbo) {
        console.log("instaciar dbo");
        this.dbo = dbo;
    };
    MateriaCalificacionService.prototype.getAll = function () {
        var sql = 'SELECT * FROM materiaCalificacion';
        console.log("consultar materiaCalificacion");
        return this.dbo.executeSql(sql, []).then(function (response) {
            var materiaCalificacion = [];
            for (var index = 0; index < response.rows.length; index++) {
                materiaCalificacion.push(response.rows.item(index));
            }
            return Promise.resolve(materiaCalificacion);
        });
    };
    MateriaCalificacionService.prototype.create = function (materiaCalificacion) {
        console.log("crear registro");
        var sql = 'INSERT INTO materiaCalificacion(id_materia , id_calificacion) VALUES(?,?)';
        return this.dbo.executeSql(sql, [materiaCalificacion.id_materia, materiaCalificacion.id_calificacion]);
    };
    MateriaCalificacionService.prototype.update = function (materiaCalificacion) {
        console.log("update pendientes" + materiaCalificacion.id_MateriaCalificacion);
        var sql = 'UPDATE materiaCalificacion SET id_Materia=?, id_calificacion=? WHERE id_MateriaCalificacion=?';
        return this.dbo.executeSql(sql, [materiaCalificacion.id_materia, materiaCalificacion.id_calificacion, materiaCalificacion.id_MateriaCalificacion]);
    };
    MateriaCalificacionService.prototype.delete = function (materiaCalificacion) {
        var sql = 'DELETE FROM materiaCalificacion WHERE id_MateriaCalificacion=?';
        return this.dbo.executeSql(sql, [materiaCalificacion.id_MateriaCalificacion]);
    };
    return MateriaCalificacionService;
}());
MateriaCalificacionService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], MateriaCalificacionService);
export { MateriaCalificacionService };
//# sourceMappingURL=materia-calificacion-service.js.map