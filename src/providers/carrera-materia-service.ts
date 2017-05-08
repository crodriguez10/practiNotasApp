import { Injectable } from '@angular/core';
import { SQLiteObject  } from '@ionic-native/sqlite';

/*
  Generated class for the CarreraMateria provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CarreraMateriaService {

	dbo: SQLiteObject;
	constructor() {

	}

	setDbo(dbo: SQLiteObject){
		console.log("instaciar dbo");
		this.dbo = dbo;
	}

	getAll(){
		let sql = 'SELECT * FROM carreraMateria';
		console.log("consultar carreraMateria");
		return this.dbo.executeSql(sql, []).then(
			response => {
				let carreraMateria = [];
				for (let index = 0; index < response.rows.length; index++) {
					carreraMateria.push( response.rows.item(index) );
				}
				return Promise.resolve( carreraMateria );
			}
		)
	}

	create(carreraMateria: any){
		console.log("crear registro");
		let sql = 'INSERT INTO carreraMateria(id_carrera , id_materia , estadoCarreraMateria) VALUES(?,?,?)';
		return this.dbo.executeSql(sql, [carreraMateria.id_carrera, carreraMateria.id_materia, carreraMateria.estadoCarreraMateria]);
	}

	update(carreraMateria: any){
		console.log("update carreraMateria"+carreraMateria.id_carreraMateria);
		let sql = 'UPDATE carreraMateria SET id_carrera=? , id_materia=? , estadoCarreraMateria=? WHERE id_carreraMateria=?';
		return this.dbo.executeSql(sql, [carreraMateria.id_carrera, carreraMateria.id_materia, carreraMateria.estadoCarreraMateria, carreraMateria.id_carreraMateria]);
	}

	delete(carreraMateria: any){
		let sql = 'DELETE FROM carreraMateria WHERE id_carreraMateria=?';
		return this.dbo.executeSql(sql, [carreraMateria.id_carreraMateria]);
	}

}
