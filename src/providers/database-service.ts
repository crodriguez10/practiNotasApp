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
		  name: 'database_v1.db',
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

}
