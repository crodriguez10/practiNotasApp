import { Injectable } from '@angular/core';
import { SQLiteObject  } from '@ionic-native/sqlite';

/*
  Generated class for the Pendientes provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PendientesService {

	dbo: SQLiteObject;
	constructor() {

	}

	setDbo(dbo: SQLiteObject){
		console.log("instaciar dbo");
		this.dbo = dbo;
	}

	getAll(){
		let sql = 'SELECT * FROM pendientes';
		console.log("consultar pendientes");
		return this.dbo.executeSql(sql, []).then(
			response => {
				let pendientes = [];
				for (let index = 0; index < response.rows.length; index++) {
					pendientes.push( response.rows.item(index) );
				}
				return Promise.resolve( pendientes );
			}
		)
	}

	create(pendientes: any){
		console.log("crear registro");
		let sql = 'INSERT INTO pendientes(id_materia , descripcion , fechaEvento , estadoEvento) VALUES(?,?,?,?)';
		return this.dbo.executeSql(sql, [pendientes.id_materia, pendientes.descripcion, pendientes.fechaEvento, pendientes.estadoEvento]);
	}

	update(pendientes: any){
		console.log("update pendientes"+pendientes.id_materias);
		let sql = 'UPDATE pendientes SET id_materia=? , descripcion=? , fechaEvento=? , estadoEvento=? WHERE id_pendientes=?';
		return this.dbo.executeSql(sql, [pendientes.id_materia, pendientes.descripcion, pendientes.fechaEvento, pendientes.estadoEvento, pendientes.id_pendientes]);
	}

	delete(pendientes: any){
		let sql = 'DELETE FROM pendientes WHERE id_pendientes=?';
		return this.dbo.executeSql(sql, [pendientes.id_pendientes]);
	}

}