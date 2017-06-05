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
  Generated class for the CarrerasService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var CarrerasService = (function () {
    function CarrerasService() {
        console.log('Hello CarrerasService Provider');
    }
    CarrerasService.prototype.setDbo = function (dbo) {
        console.log("instaciar dbo");
        this.dbo = dbo;
    };
    CarrerasService.prototype.getAll = function () {
        var sql = 'SELECT * FROM carreras';
        console.log("consultar carreras");
        return this.dbo.executeSql(sql, []).then(function (response) {
            var carreras = [];
            for (var index = 0; index < response.rows.length; index++) {
                carreras.push(response.rows.item(index));
            }
            return Promise.resolve(carreras);
        });
    };
    CarrerasService.prototype.create = function (carreras) {
        var _this = this;
        console.log("crear registro");
        var sql = 'INSERT INTO carreras(descripcion , estadoCarrera) VALUES(?,?)';
        return this.dbo.executeSql(sql, [carreras.descripcion, carreras.estadoCarrera]).then(function (result) {
            _this.dbo.executeSql("SELECT id_carreras from carreras ORDER BY id_carreras DESC LIMIT 1", []).then(function (response) {
                console.log("response: " + response.rows.item(0).id_carreras);
                return response.rows.item(0).id_carreras;
            });
        });
    };
    CarrerasService.prototype.update = function (carreras) {
        console.log("update carreras" + carreras.id_carreras);
        var sql = 'UPDATE carreras SET descripcion=?, estadoCarrera=? WHERE id_carreras=?';
        return this.dbo.executeSql(sql, [carreras.descripcion, carreras.estadoCarrera, carreras.id_carreras]);
    };
    CarrerasService.prototype.delete = function (carreras) {
        var sql = 'DELETE FROM carreras WHERE id_carreras=?';
        return this.dbo.executeSql(sql, [carreras.id_carreras]);
    };
    return CarrerasService;
}());
CarrerasService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], CarrerasService);
export { CarrerasService };
//# sourceMappingURL=carreras-service.js.map