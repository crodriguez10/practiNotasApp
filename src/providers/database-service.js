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
import { SQLite } from '@ionic-native/sqlite';
/*
  Generated class for the DatabaseService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var DatabaseService = (function () {
    function DatabaseService() {
        this.db = new SQLite();
        console.log("instanciar db");
        this.openDatabase();
    }
    DatabaseService.prototype.openDatabase = function () {
        var _this = this;
        return this.db.create({
            name: 'database_v3.db',
            location: 'default'
        }).then(function (db) {
            _this.dbo = db;
            console.log('init object dbo');
        });
    };
    DatabaseService.prototype.getDbo = function () {
        return this.dbo;
    };
    DatabaseService.prototype.createTableMaterias = function () {
        console.log('createTaable');
        var sql = 'CREATE TABLE IF NOT EXISTS materias(id_materias INTEGER PRIMARY KEY AUTOINCREMENT, descripcion TEXT, estado_materia INTEGER)';
        return this.dbo.executeSql(sql, []);
    };
    DatabaseService.prototype.createTableDocentes = function () {
        console.log('createTaableDocentes');
        var sql = 'CREATE TABLE IF NOT EXISTS docentes(id_docentes INTEGER PRIMARY KEY AUTOINCREMENT, nombres TEXT, primer_apellido TEXT, segundo_apellido TEXT, contacto_telefono INTEGER, estado_docente INTEGER)';
        return this.dbo.executeSql(sql, []);
    };
    DatabaseService.prototype.createTableApuntes = function () {
        console.log('createTaableApuntas');
        var sql = 'CREATE TABLE IF NOT EXISTS apuntes(id_apuntes INTEGER PRIMARY KEY AUTOINCREMENT, id_materia INTEGER, descripcion TEXT, adjunto TEXT, estado_apunte INTEGER)';
        return this.dbo.executeSql(sql, []);
    };
    DatabaseService.prototype.createTableCarreras = function () {
        console.log('createTableCarreras');
        var sql = 'CREATE TABLE IF NOT EXISTS carreras( id_carreras  INTEGER PRIMARY KEY AUTOINCREMENT , descripcion TEXT , estadoCarrera INTEGER )';
        return this.dbo.executeSql(sql, []);
    };
    DatabaseService.prototype.createTableCarreraMateria = function () {
        console.log('createTableCarreraMateria');
        var sql = 'CREATE TABLE IF NOT EXISTS carreraMateria ( id_carreraMateria INTEGER PRIMARY KEY AUTOINCREMENT , id_carrera INTEGER , id_materia INTEGER , estadoCarreraMateria INTEGER )';
        return this.dbo.executeSql(sql, []);
    };
    DatabaseService.prototype.createTableCorte = function () {
        console.log('createTableCorte');
        var sql = 'CREATE TABLE IF NOT EXISTS corte ( id_corte INTEGER PRIMARY KEY AUTOINCREMENT , descripcion TEXT , estadoCorte INTEGER )';
        return this.dbo.executeSql(sql, []);
    };
    DatabaseService.prototype.createTableCorteMateria = function () {
        console.log('createTableCorteMateria');
        var sql = 'CREATE TABLE IF NOT EXISTS corteMateria ( id_corteMateria INTEGER PRIMARY KEY AUTOINCREMENT , id_corte INTEGER , id_materia INTEGER , estadoCorteMateria INTEGER )';
        return this.dbo.executeSql(sql, []);
    };
    DatabaseService.prototype.createTableDocenteMateria = function () {
        console.log('createTableDocenteMateria');
        var sql = 'CREATE TABLE IF NOT EXISTS docenteMateria ( id_docenteMateria INTEGER PRIMARY KEY AUTOINCREMENT , id_docente INTEGER , id_Materia INTEGER , estadoDocenteMateria INTEGER )';
        return this.dbo.executeSql(sql, []);
    };
    DatabaseService.prototype.createTablePendientes = function () {
        console.log('createTablePendientes');
        var sql = 'CREATE TABLE IF NOT EXISTS pendientes ( id_pendientes INTEGER PRIMARY KEY AUTOINCREMENT , id_materia INTEGER , descripcion TEXT , horaEvento TEXT, diaEvento TEXT , estadoEvento INTEGER )';
        return this.dbo.executeSql(sql, []);
    };
    DatabaseService.prototype.createTableCalificaciones = function () {
        console.log('createTaableCalificaciones');
        var sql = 'CREATE TABLE IF NOT EXISTS calificaciones(id_calificaciones INTEGER PRIMARY KEY AUTOINCREMENT, nota INTEGER, descripcion TEXT, materia INTEGER)';
        return this.dbo.executeSql(sql, []);
    };
    DatabaseService.prototype.createTableMateriaCalificacion = function () {
        console.log('createTableMateriaCalificacion');
        var sql = 'CREATE TABLE IF NOT EXISTS MateriaCalificacion ( id_MateriaCalificacion INTEGER PRIMARY KEY AUTOINCREMENT , id_materia INTEGER , id_calificacion INTEGER )';
        return this.dbo.executeSql(sql, []);
    };
    return DatabaseService;
}());
DatabaseService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], DatabaseService);
export { DatabaseService };
//# sourceMappingURL=database-service.js.map