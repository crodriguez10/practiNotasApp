import { Injectable } from '@angular/core';
import { SQLiteObject  } from '@ionic-native/sqlite';

/*
  Generated class for the CorteMateria provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CorteMateriaService {

	dbo: SQLiteObject;
	constructor() {

	}

	setDbo(dbo: SQLiteObject){
		console.log("instaciar dbo");
		this.dbo = dbo;
	}

	getAll(){
		let sql = 'SELECT * FROM corteMateria';
		console.log("consultar corteMateria");
		return this.dbo.executeSql(sql, []).then(
			response => {
				let corteMateria = [];
				for (let index = 0; index < response.rows.length; index++) {
					corteMateria.push( response.rows.item(index) );
				}
				return Promise.resolve( corteMateria );
			}
		)
	}

	create(corteMateria: any){
		console.log("crear registro");
		let sql = 'INSERT INTO corteMateria(id_corte , id_materia , estadoCorteMateria) VALUES(?,?,?)';
		return this.dbo.executeSql(sql, [corteMateria.id_corte, corteMateria.id_materia, corteMateria.estadoCorteMateria]);
	}

	update(corteMateria: any){
		console.log("update corteMateria"+corteMateria.id_corteMateria);
		let sql = 'UPDATE corteMateria SET id_corte=? , id_materia=? , estadoCorteMateria=? WHERE id_corteMateria=?';
		return this.dbo.executeSql(sql, [corteMateria.id_corte, corteMateria.id_materia, corteMateria.estadoCorteMateria, corteMateria.id_corteMateria]);
	}

	delete(corteMateria: any){
		let sql = 'DELETE FROM corteMateria WHERE id_corteMateria=?';
		return this.dbo.executeSql(sql, [corteMateria.id_corteMateria]);
	}

}
