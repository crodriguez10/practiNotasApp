import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject  } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DatabaseService {

  	db: SQLite;
	dbo: SQLiteObject;

	constructor(){
		this.db = new SQLite();
		console.log("instanciar db");
		this.openDatabase();
	}
	
	openDatabase(){
	  return this.db.create({
		  name: 'database_v3.db',
		  location: 'default'
		}).then((db: SQLiteObject) =>{

			this.dbo = db;
			console.log('init object dbo');
		})
	}

	getDbo(){
		return this.dbo;
	}

	createTableMaterias(){
		console.log('createTaable');
		let sql = 'CREATE TABLE IF NOT EXISTS materias(id_materias INTEGER PRIMARY KEY AUTOINCREMENT, descripcion TEXT, estado_materia INTEGER)';
		return this.dbo.executeSql(sql, []);
	}

	createTableDocentes(){
		console.log('createTaableDocentes');
		let sql = 'CREATE TABLE IF NOT EXISTS docentes(id_docentes INTEGER PRIMARY KEY AUTOINCREMENT, nombres TEXT, primer_apellido TEXT, segundo_apellido TEXT, contacto_telefono INTEGER, estado_docente INTEGER)';
		return this.dbo.executeSql(sql, []);
	}

	createTableApuntes(){
		console.log('createTaableApuntas');
		let sql = 'CREATE TABLE IF NOT EXISTS apuntes(id_apuntes INTEGER PRIMARY KEY AUTOINCREMENT, id_materia INTEGER, descripcion TEXT, adjunto TEXT, estado_apunte INTEGER)';
		return this.dbo.executeSql(sql, []);
	}

	createTableCarreras(){
		console.log('createTableCarreras');
		let sql = 'CREATE TABLE IF NOT EXISTS carreras( id_carreras  INTEGER PRIMARY KEY AUTOINCREMENT , descripcion TEXT , estadoCarrera INTEGER )';
		return this.dbo.executeSql(sql, []);
	}

	createTableCarreraMateria(){
		console.log('createTableCarreraMateria');
		let sql = 'CREATE TABLE IF NOT EXISTS carreraMateria ( id_carreraMateria INTEGER PRIMARY KEY AUTOINCREMENT , id_carrera INTEGER , id_materia INTEGER , estadoCarreraMateria INTEGER )';
		return this.dbo.executeSql(sql, []);
	}	

	createTableCorte(){
		console.log('createTableCorte');
		let sql = 'CREATE TABLE IF NOT EXISTS corte ( id_corte INTEGER PRIMARY KEY AUTOINCREMENT , descripcion TEXT , estadoCorte INTEGER )';
		return this.dbo.executeSql(sql, []);
	}
	
	createTableCorteMateria(){
		console.log('createTableCorteMateria');
		let sql = 'CREATE TABLE IF NOT EXISTS corteMateria ( id_corteMateria INTEGER PRIMARY KEY AUTOINCREMENT , id_corte INTEGER , id_materia INTEGER , estadoCorteMateria INTEGER )';
		return this.dbo.executeSql(sql, []);
	}

	createTableDocenteMateria(){
		console.log('createTableDocenteMateria');
		let sql = 'CREATE TABLE IF NOT EXISTS docenteMateria ( id_docenteMateria INTEGER PRIMARY KEY AUTOINCREMENT , id_docente INTEGER , id_Materia INTEGER , estadoDocenteMateria INTEGER )';
		return this.dbo.executeSql(sql, []);
	}
	
	createTablePendientes(){
		console.log('createTablePendientes');
		let sql = 'CREATE TABLE IF NOT EXISTS pendientes ( id_pendientes INTEGER PRIMARY KEY AUTOINCREMENT , id_materia INTEGER , descripcion TEXT , horaEvento TEXT, diaEvento TEXT , estadoEvento INTEGER )';
		return this.dbo.executeSql(sql, []);
	}

	createTableCalificaciones(){
		console.log('createTaableCalificaciones');
		let sql = 'CREATE TABLE IF NOT EXISTS calificaciones(id_calificaciones INTEGER PRIMARY KEY AUTOINCREMENT, nota INTEGER, descripcion TEXT, materia INTEGER)';
		return this.dbo.executeSql(sql, []);
	}

	createTableMateriaCalificacion(){
		console.log('createTableMateriaCalificacion');
		let sql = 'CREATE TABLE IF NOT EXISTS MateriaCalificacion ( id_MateriaCalificacion INTEGER PRIMARY KEY AUTOINCREMENT , id_materia INTEGER , id_calificacion INTEGER )';
		return this.dbo.executeSql(sql, []);
	}

}
