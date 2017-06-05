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
  Generated class for the CarreraMateria provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var CarreraMateriaService = (function () {
    function CarreraMateriaService() {
    }
    CarreraMateriaService.prototype.setDbo = function (dbo) {
        console.log("instaciar dbo");
        this.dbo = dbo;
    };
    CarreraMateriaService.prototype.getAll = function () {
        var sql = 'SELECT * FROM carreraMateria';
        console.log("consultar carreraMateria");
        return this.dbo.executeSql(sql, []).then(function (response) {
            var carreraMateria = [];
            for (var index = 0; index < response.rows.length; index++) {
                carreraMateria.push(response.rows.item(index));
            }
            return Promise.resolve(carreraMateria);
        });
    };
    CarreraMateriaService.prototype.create = function (carreraMateria) {
        console.log("crear registro carreraMateria");
        var sql = 'INSERT INTO carreraMateria(id_carrera , id_materia , estadoCarreraMateria) VALUES(?,?,?)';
        return this.dbo.executeSql(sql, [carreraMateria.id_carrera, carreraMateria.id_materia, carreraMateria.estadoCarreraMateria]);
    };
    CarreraMateriaService.prototype.update = function (carreraMateria) {
        console.log("update carreraMateria" + carreraMateria.id_carreraMateria);
        var sql = 'UPDATE carreraMateria SET id_carrera=? , id_materia=? , estadoCarreraMateria=? WHERE id_carreraMateria=?';
        return this.dbo.executeSql(sql, [carreraMateria.id_carrera, carreraMateria.id_materia, carreraMateria.estadoCarreraMateria, carreraMateria.id_carreraMateria]);
    };
    CarreraMateriaService.prototype.delete = function (carreraMateria) {
        var sql = 'DELETE FROM carreraMateria WHERE id_carreraMateria=?';
        return this.dbo.executeSql(sql, [carreraMateria.id_carreraMateria]);
    };
    return CarreraMateriaService;
}());
CarreraMateriaService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], CarreraMateriaService);
export { CarreraMateriaService };
//# sourceMappingURL=carrera-materia-service.js.map