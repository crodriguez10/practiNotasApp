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
  Generated class for the CorteMateria provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var CorteMateriaService = (function () {
    function CorteMateriaService() {
    }
    CorteMateriaService.prototype.setDbo = function (dbo) {
        console.log("instaciar dbo");
        this.dbo = dbo;
    };
    CorteMateriaService.prototype.getAll = function () {
        var sql = 'SELECT * FROM corteMateria';
        console.log("consultar corteMateria");
        return this.dbo.executeSql(sql, []).then(function (response) {
            var corteMateria = [];
            for (var index = 0; index < response.rows.length; index++) {
                corteMateria.push(response.rows.item(index));
            }
            return Promise.resolve(corteMateria);
        });
    };
    CorteMateriaService.prototype.create = function (corteMateria) {
        console.log("crear registro corte materia");
        var sql = 'INSERT INTO corteMateria(id_corte , id_materia , estadoCorteMateria) VALUES(?,?,?)';
        return this.dbo.executeSql(sql, [corteMateria.id_corte, corteMateria.id_materia, corteMateria.estadoCorteMateria]);
    };
    CorteMateriaService.prototype.update = function (corteMateria) {
        console.log("update corteMateria" + corteMateria.id_corteMateria);
        var sql = 'UPDATE corteMateria SET id_corte=? , id_materia=? , estadoCorteMateria=? WHERE id_corteMateria=?';
        return this.dbo.executeSql(sql, [corteMateria.id_corte, corteMateria.id_materia, corteMateria.estadoCorteMateria, corteMateria.id_corteMateria]);
    };
    CorteMateriaService.prototype.delete = function (corteMateria) {
        var sql = 'DELETE FROM corteMateria WHERE id_corteMateria=?';
        return this.dbo.executeSql(sql, [corteMateria.id_corteMateria]);
    };
    return CorteMateriaService;
}());
CorteMateriaService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], CorteMateriaService);
export { CorteMateriaService };
//# sourceMappingURL=corte-materia-service.js.map