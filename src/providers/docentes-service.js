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
  Generated class for the DocentesService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var DocentesService = (function () {
    function DocentesService() {
    }
    DocentesService.prototype.setDbo = function (dbo) {
        console.log("instaciar dbo");
        this.dbo = dbo;
    };
    DocentesService.prototype.getAll = function () {
        var sql = 'SELECT * FROM docentes';
        console.log("consultar docentes");
        return this.dbo.executeSql(sql, [])
            .then(function (response) {
            var docentes = [];
            for (var index = 0; index < response.rows.length; index++) {
                docentes.push(response.rows.item(index));
            }
            return Promise.resolve(docentes);
        });
    };
    DocentesService.prototype.create = function (docente) {
        console.log("crear registro");
        var sql = 'INSERT INTO docentes(nombres, primer_apellido, segundo_apellido, contacto_telefono, estado_docente) VALUES(?,?,?,?,?)';
        return this.dbo.executeSql(sql, [docente.nombres, docente.primer_apellido, docente.segundo_apellido, docente.contacto_telefono, docente.estado_docente]);
    };
    DocentesService.prototype.update = function (docente) {
        console.log("modificar docente" + docente.id_docentes);
        var sql = 'UPDATE docentes SET nombres = ?, primer_apellido = ?, segundo_apellido = ?, contacto_telefono = ?, estado_docente = ? WHERE id_docentes=?';
        return this.dbo.executeSql(sql, [docente.nombres, docente.primer_apellido, docente.segundo_apellido, docente.contacto_telefono, docente.estado_docente, docente.id_docentes]);
    };
    DocentesService.prototype.delete = function (docente) {
        var sql = 'DELETE FROM docentes WHERE id_docentes=?';
        return this.dbo.executeSql(sql, [docente.id_docentes]);
    };
    return DocentesService;
}());
DocentesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], DocentesService);
export { DocentesService };
//# sourceMappingURL=docentes-service.js.map