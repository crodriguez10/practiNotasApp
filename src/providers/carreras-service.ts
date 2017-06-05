import { Injectable } from '@angular/core';
import { SQLiteObject  } from '@ionic-native/sqlite';

/*
  Generated class for the CarrerasService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CarrerasService {

  dbo: SQLiteObject;
  
  constructor() {
    console.log('Hello CarrerasService Provider');
  }

	

	setDbo(dbo: SQLiteObject){
		console.log("instaciar dbo");
		this.dbo = dbo;
	}
	
	getAll(){
		let sql = 'SELECT * FROM carreras';
		console.log("consultar carreras");
		return this.dbo.executeSql(sql, []).then(
			response => {
				let carreras = [];
				for (let index = 0; index < response.rows.length; index++) {
					carreras.push( response.rows.item(index) );
				}
				return Promise.resolve( carreras );
			}
		)
	}

	create(carreras: any){
		console.log("crear registro");
		let sql = 'INSERT INTO carreras(descripcion , estadoCarrera) VALUES(?,?)';
		return this.dbo.executeSql(sql, [carreras.descripcion, carreras.estadoCarrera]).then(result => {
	  	this.dbo.executeSql("SELECT id_carreras from carreras ORDER BY id_carreras DESC LIMIT 1",[]).then(response =>
	  	{
	  		console.log("response: "+response.rows.item(0).id_carreras)	;
	  	 	return response.rows.item(0).id_carreras;
	  	})
	  });
	}

	update(carreras: any){
		console.log("update carreras"+carreras.id_carreras);
		let sql = 'UPDATE carreras SET descripcion=?, estadoCarrera=? WHERE id_carreras=?';
		return this.dbo.executeSql(sql, [carreras.descripcion, carreras.estadoCarrera, carreras.id_carreras]);
	}

	delete(carreras: any){
		let sql = 'DELETE FROM carreras WHERE id_carreras=?';
		return this.dbo.executeSql(sql, [carreras.id_carreras]);
	}

}
