import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the Corte provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CorteService {

	dbo: SQLiteObject;
	constructor() {

	}

	setDbo(dbo: SQLiteObject){
		console.log("instaciar dbo");
		this.dbo = dbo;
	}

	getAll(){
		let sql = 'SELECT * FROM corte';
		console.log("consultar corte");
		return this.dbo.executeSql(sql, []).then(
			response => {
				let corte = [];
				for (let index = 0; index < response.rows.length; index++) {
					corte.push( response.rows.item(index) );
				}
				return Promise.resolve( corte );
			}
		)
	}

	create(corte: any){
		console.log("crear registro");
		let sql = 'INSERT INTO corte(descripcion , estadoCorte) VALUES(?,?)';
		return this.dbo.executeSql(sql, [corte.descripcion, corte.estadoCorte]);
	}

	update(corte: any){
		console.log("update corte"+corte.id_corte);
		let sql = 'UPDATE corte SET descripcion=?, estadoCorte=? WHERE id_corte=?';
		return this.dbo.executeSql(sql, [corte.descripcion, corte.estadoCorte, corte.id_corte]);
	}

	delete(corte: any){
		let sql = 'DELETE FROM corte WHERE id_corte=?';
		return this.dbo.executeSql(sql, [corte.id_corte]);
	}

}
