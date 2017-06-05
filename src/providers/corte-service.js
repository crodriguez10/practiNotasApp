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
  Generated class for the Corte provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var CorteService = (function () {
    function CorteService() {
    }
    CorteService.prototype.setDbo = function (dbo) {
        console.log("instaciar dbo");
        this.dbo = dbo;
    };
    CorteService.prototype.getAll = function () {
        var sql = 'SELECT * FROM corte';
        console.log("consultar corte");
        return this.dbo.executeSql(sql, []).then(function (response) {
            var corte = [];
            for (var index = 0; index < response.rows.length; index++) {
                corte.push(response.rows.item(index));
            }
            return Promise.resolve(corte);
        });
    };
    CorteService.prototype.create = function (corte) {
        console.log("crear registro");
        var sql = 'INSERT INTO corte(descripcion , estadoCorte) VALUES(?,?)';
        return this.dbo.executeSql(sql, [corte.descripcion, corte.estadoCorte]);
    };
    CorteService.prototype.update = function (corte) {
        console.log("update corte" + corte.id_corte);
        var sql = 'UPDATE corte SET descripcion=?, estadoCorte=? WHERE id_corte=?';
        return this.dbo.executeSql(sql, [corte.descripcion, corte.estadoCorte, corte.id_corte]);
    };
    CorteService.prototype.delete = function (corte) {
        var sql = 'DELETE FROM corte WHERE id_corte=?';
        return this.dbo.executeSql(sql, [corte.id_corte]);
    };
    return CorteService;
}());
CorteService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], CorteService);
export { CorteService };
//# sourceMappingURL=corte-service.js.map