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
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';
/*
  Generated class for the PendientesService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var PendientesService = (function () {
    function PendientesService() {
    }
    PendientesService.prototype.setDbo = function (dbo) {
        console.log("instaciar dbo");
        this.dbo = dbo;
    };
    PendientesService.prototype.create = function (pendiente) {
        console.log("crear registro Pendiente descripcion:" + pendiente.descripcion);
        var sql = 'INSERT INTO pendientes(id_materia  , descripcion  , estadoEvento,horaEvento , diaEvento  ) VALUES(?,?,?,?,?)';
        return this.dbo.executeSql(sql, [pendiente.id_materia, pendiente.descripcion, pendiente.estadoEvento, pendiente.horaEvento, pendiente.diaEvento]);
    };
    PendientesService.prototype.update = function (pendiente) {
        console.log("update pendientes" + pendiente.id_pendientes);
        var sql = 'UPDATE pendientes SET id_materia= ?  , descripcion= ?   , estadoEvento= ? , horaEvento =?, diaEvento =? WHERE id_pendientes=?';
        return this.dbo.executeSql(sql, [pendiente.id_materia, pendiente.descripcion, pendiente.estadoEvento, pendiente.horaEvento, pendiente.diaEvento, pendiente.id_pendientes]);
    };
    PendientesService.prototype.delete = function (pendiente) {
        var sql = 'DELETE FROM pendientes WHERE id_pendientes=?';
        return this.dbo.executeSql(sql, [pendiente.id_pendientes]);
    };
    PendientesService.prototype.getAll = function () {
        var sql = 'SELECT * FROM pendientes';
        console.log("consultar pendientes");
        return this.dbo.executeSql(sql, [])
            .then(function (response) {
            var pendientes = [];
            for (var index = 0; index < response.rows.length; index++) {
                pendientes.push(response.rows.item(index));
            }
            return Promise.resolve(pendientes);
        });
    };
    return PendientesService;
}());
PendientesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], PendientesService);
export { PendientesService };
//# sourceMappingURL=pendientes-service.js.map