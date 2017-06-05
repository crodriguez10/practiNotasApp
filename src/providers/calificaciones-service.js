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
  Generated class for the CalificacionesService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var CalificacionesService = (function () {
    function CalificacionesService() {
    }
    CalificacionesService.prototype.setDbo = function (dbo) {
        console.log("instaciar dbo");
        this.dbo = dbo;
    };
    CalificacionesService.prototype.getAll = function () {
        var sql = 'SELECT * FROM calificaciones';
        console.log("consultar calificaciones");
        return this.dbo.executeSql(sql, [])
            .then(function (response) {
            var calificaciones = [];
            for (var index = 0; index < response.rows.length; index++) {
                calificaciones.push(response.rows.item(index));
            }
            return Promise.resolve(calificaciones);
        });
    };
    CalificacionesService.prototype.buscar = function () {
        var sql = 'SELECT c.nota as nota,c.descripcion as descripcion,m.descripcion as materia FROM calificaciones c,materias m where c.materia = m.id_materias';
        console.log("consultar calificaciones");
        return this.dbo.executeSql(sql, [])
            .then(function (response) {
            var calificaciones = [];
            for (var index = 0; index < response.rows.length; index++) {
                calificaciones.push(response.rows.item(index));
            }
            return Promise.resolve(calificaciones);
        });
    };
    CalificacionesService.prototype.create = function (calificacion) {
        console.log("crear registro");
        var sql = 'INSERT INTO calificaciones(nota, descripcion, materia) VALUES(?,?,?)';
        return this.dbo.executeSql(sql, [calificacion.nota, calificacion.descripcion, calificacion.materia]);
    };
    CalificacionesService.prototype.update = function (calificacion) {
        console.log("update calificaciones" + calificacion.id_calificaciones);
        var sql = 'UPDATE calificaciones SET nota=?, descripcion=?, materia=? WHERE id_calificaciones=?';
        return this.dbo.executeSql(sql, [calificacion.nota, calificacion.descripcion, calificacion.materia, calificacion.id_calificaciones]);
    };
    CalificacionesService.prototype.delete = function (calificacion) {
        var sql = 'DELETE FROM calificaciones WHERE id_calificaciones=?';
        return this.dbo.executeSql(sql, [calificacion.id_calificaciones]);
    };
    return CalificacionesService;
}());
CalificacionesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], CalificacionesService);
export { CalificacionesService };
//# sourceMappingURL=calificaciones-service.js.map