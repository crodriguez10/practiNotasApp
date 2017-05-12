import { Injectable } from '@angular/core';
import { SQLiteObject  } from '@ionic-native/sqlite';

/*
  Generated class for the DocenteMateria provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DocenteMateriaService {

	dbo: SQLiteObject;
	constructor() {

	}

	setDbo(dbo: SQLiteObject){
		console.log("instaciar dbo");
		this.dbo = dbo;
	}

	getAll(){
		let sql = 'SELECT * FROM docenteMateria';
		console.log("consultar docenteMateria");
		return this.dbo.executeSql(sql, []).then(
			response => {
				let docenteMateria = [];
				for (let index = 0; index < response.rows.length; index++) {
					docenteMateria.push( response.rows.item(index) );
				}
				return Promise.resolve( docenteMateria );
			}
		)
	}

	create(docenteMateria: any){
		console.log("crear registro");
		let sql = 'INSERT INTO docenteMateria(id_docente , id_Materia , estadoDocenteMateria) VALUES(?,?,?)';
		return this.dbo.executeSql(sql, [docenteMateria.id_docente, docenteMateria.id_Materia, docenteMateria.estadoDocenteMateria]);
	}

	update(docenteMateria: any){
		console.log("update pendientes"+docenteMateria.id_docenteMateria);
		let sql = 'UPDATE docenteMateria SET id_docente=?, id_Materia=?, estadoDocenteMateria=? WHERE id_docenteMateria=?';
		return this.dbo.executeSql(sql, [docenteMateria.id_docente, docenteMateria.id_Materia, docenteMateria.estadoDocenteMateria, docenteMateria.id_docenteMateria]);
	}

	delete(docenteMateria: any){
		let sql = 'DELETE FROM docenteMateria WHERE id_docenteMateria=?';
		return this.dbo.executeSql(sql, [docenteMateria.id_docenteMateria]);
	}
}