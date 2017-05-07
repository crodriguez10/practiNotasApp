import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
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
		  name: 'database.db',
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
		let sql = 'CREATE TABLE IF NOT EXISTS materias(id INTEGER PRIMARY KEY AUTOINCREMENT, descripcion TEXT, estado_materia INTEGER)';
		return this.dbo.executeSql(sql, []);
	}

}
