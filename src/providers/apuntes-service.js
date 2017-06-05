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
  Generated class for the ApuntesService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var ApuntesService = (function () {
    function ApuntesService() {
    }
    ApuntesService.prototype.setDbo = function (dbo) {
        console.log("instaciar dbo");
        this.dbo = dbo;
    };
    ApuntesService.prototype.getAll = function () {
        var sql = 'SELECT * FROM apuntes';
        console.log("consultar apuntes");
        return this.dbo.executeSql(sql, [])
            .then(function (response) {
            var apuntes = [];
            for (var index = 0; index < response.rows.length; index++) {
                apuntes.push(response.rows.item(index));
                console.log("descripcion " + response.rows.item(index).descripcion);
                console.log("id_materia " + response.rows.item(index).id_materia);
            }
            return Promise.resolve(apuntes);
        });
    };
    ApuntesService.prototype.create = function (apunte) {
        console.log("crear registro apuntes" + apunte.adjunto);
        var sql = 'INSERT INTO apuntes(id_materia, descripcion, adjunto, estado_apunte) VALUES(?,?,?,?)';
        return this.dbo.executeSql(sql, [apunte.id_materia, apunte.descripcion, apunte.adjunto, apunte.estado_apunte]);
    };
    ApuntesService.prototype.delete = function (apunte) {
        console.log("eliminar apunte" + apunte.id_apuntes);
        var sql = 'DELETE FROM apuntes WHERE id_apuntes=?';
        return this.dbo.executeSql(sql, [apunte.id_apuntes]);
    };
    ApuntesService.prototype.getApunteById = function (id_apuntes) {
        var sql = 'SELECT adjunto, apuntes.descripcion AS descripcion_apunte, materias.descripcion AS descripcion_materia FROM apuntes, materias WHERE apuntes.id_materia = materias.id_materias AND id_apuntes = ? ';
        //let sql = 'SELECT adjunto FROM apuntes WHERE id_apuntes = ? ';
        console.log("consultar apunte by id" + sql);
        return this.dbo.executeSql(sql, [id_apuntes])
            .then(function (response) {
            console.log("response: " + response);
            console.log("response rows: " + response.rows);
            console.log("response: " + response.rows.item(0));
            console.log("response adjunto: " + response.rows.item(0).adjunto);
            console.log("response descripcion_materia: " + response.rows.item(0).descripcion_materia);
            console.log("response descripcion_apunte: " + response.rows.item(0).descripcion_apunte);
            return response.rows.item(0);
        });
    };
    return ApuntesService;
}());
ApuntesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], ApuntesService);
export { ApuntesService };
//# sourceMappingURL=apuntes-service.js.map