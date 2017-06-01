import { Injectable } from '@angular/core';
import { SQLiteObject  } from '@ionic-native/sqlite';

/*
  Generated class for the MateriaCalificacionService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MateriaCalificacionService {

  	dbo: SQLiteObject;
	constructor() {

	}

	setDbo(dbo: SQLiteObject){
		console.log("instaciar dbo");
		this.dbo = dbo;
	}

	getAll(){
		let sql = 'SELECT * FROM materiaCalificacion';
		console.log("consultar materiaCalificacion");
		return this.dbo.executeSql(sql, []).then(
			response => {
				let materiaCalificacion = [];
				for (let index = 0; index < response.rows.length; index++) {
					materiaCalificacion.push( response.rows.item(index) );
				}
				return Promise.resolve( materiaCalificacion );
			}
		)
	}

	create(materiaCalificacion: any){
		console.log("crear registro");
		let sql = 'INSERT INTO materiaCalificacion(id_materia , id_calificacion) VALUES(?,?)';
		return this.dbo.executeSql(sql, [materiaCalificacion.id_materia, materiaCalificacion.id_calificacion]);
	}

	update(materiaCalificacion: any){
		console.log("update pendientes"+materiaCalificacion.id_MateriaCalificacion);
		let sql = 'UPDATE materiaCalificacion SET id_Materia=?, id_calificacion=? WHERE id_MateriaCalificacion=?';
		return this.dbo.executeSql(sql, [materiaCalificacion.id_materia, materiaCalificacion.id_calificacion, materiaCalificacion.id_MateriaCalificacion]);
	}

	delete(materiaCalificacion: any){
		let sql = 'DELETE FROM materiaCalificacion WHERE id_MateriaCalificacion=?';
		return this.dbo.executeSql(sql, [materiaCalificacion.id_MateriaCalificacion]);
	}
}