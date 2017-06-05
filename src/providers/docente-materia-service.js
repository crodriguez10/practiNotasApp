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
  Generated class for the DocenteMateria provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var DocenteMateriaService = (function () {
    function DocenteMateriaService() {
    }
    DocenteMateriaService.prototype.setDbo = function (dbo) {
        console.log("instaciar dbo");
        this.dbo = dbo;
    };
    DocenteMateriaService.prototype.getAll = function () {
        var sql = 'SELECT * FROM docenteMateria';
        console.log("consultar docenteMateria");
        return this.dbo.executeSql(sql, []).then(function (response) {
            var docenteMateria = [];
            for (var index = 0; index < response.rows.length; index++) {
                docenteMateria.push(response.rows.item(index));
            }
            return Promise.resolve(docenteMateria);
        });
    };
    DocenteMateriaService.prototype.create = function (docenteMateria) {
        console.log("crear registro");
        var sql = 'INSERT INTO docenteMateria(id_docente , id_Materia , estadoDocenteMateria) VALUES(?,?,?)';
        return this.dbo.executeSql(sql, [docenteMateria.id_docente, docenteMateria.id_Materia, docenteMateria.estadoDocenteMateria]);
    };
    DocenteMateriaService.prototype.update = function (docenteMateria) {
        console.log("update pendientes" + docenteMateria.id_docenteMateria);
        var sql = 'UPDATE docenteMateria SET id_docente=?, id_Materia=?, estadoDocenteMateria=? WHERE id_docenteMateria=?';
        return this.dbo.executeSql(sql, [docenteMateria.id_docente, docenteMateria.id_Materia, docenteMateria.estadoDocenteMateria, docenteMateria.id_docenteMateria]);
    };
    DocenteMateriaService.prototype.delete = function (docenteMateria) {
        var sql = 'DELETE FROM docenteMateria WHERE id_docenteMateria=?';
        return this.dbo.executeSql(sql, [docenteMateria.id_docenteMateria]);
    };
    return DocenteMateriaService;
}());
DocenteMateriaService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], DocenteMateriaService);
export { DocenteMateriaService };
//# sourceMappingURL=docente-materia-service.js.map