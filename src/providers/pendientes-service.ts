import { Injectable } from '@angular/core';
import { SQLiteObject  } from '@ionic-native/sqlite';
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';

/*
  Generated class for the PendientesService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PendientesService {

	dbo: SQLiteObject;
	constructor(){
		
	}

	setDbo(dbo: SQLiteObject){
		console.log("instaciar dbo");
		this.dbo = dbo;
	}

	create(pendiente: any){
		console.log("crear registro Pendiente descripcion:"+pendiente.descripcion);
	  let sql = 'INSERT INTO pendientes(id_materia  , descripcion  , fechaEvento  , estadoEvento ) VALUES(?,?,?,?)';
	  return this.dbo.executeSql(sql, [pendiente.id_materia  , pendiente.descripcion  , pendiente.fechaEvento  , pendiente.estadoEvento ]);

	}

	update(pendiente: any){
		console.log("update pendientes"+pendiente.id_pendientes);
	  	let sql = 'UPDATE pendientes SET id_materia= ?  , descripcion= ?  , fechaEvento= ?  , estadoEvento= ?  WHERE id_pendientes=?';
	  	return this.dbo.executeSql(sql, [pendiente.id_materia  , pendiente.descripcion  , pendiente.fechaEvento  , pendiente.estadoEvento, pendiente.id_pendientes]);
	}

	delete(pendiente: any){
	  let sql = 'DELETE FROM pendientes WHERE id_pendientes=?';
	  return this.dbo.executeSql(sql, [pendiente.id_pendientes]);
	}

	getAll(){
	  let sql = 'SELECT * FROM pendientes';
	  console.log("consultar pendientes");
	  return this.dbo.executeSql(sql, [])
	  .then(response => {
	    let pendientes = [];
	    for (let index = 0; index < response.rows.length; index++) {
	      pendientes.push( response.rows.item(index) );
	    }
	    return Promise.resolve( pendientes );
	  })
	}
  

}
