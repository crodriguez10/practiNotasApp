import { Injectable } from '@angular/core';
import { SQLiteObject  } from '@ionic-native/sqlite';

/*
  Generated class for the MateriasService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MateriasService {

	
	dbo: SQLiteObject;
	constructor(){
		
	}

	setDbo(dbo: SQLiteObject){
		console.log("instaciar dbo");
		this.dbo = dbo;
	}

	getAll(){
	  let sql = 'SELECT * FROM materias';
	  console.log("consultar materias");
	  return this.dbo.executeSql(sql, [])
	  .then(response => {
	    let materias = [];
	    for (let index = 0; index < response.rows.length; index++) {
	      materias.push( response.rows.item(index) );
	    }
	    return Promise.resolve( materias );
	  })
	}

	create(materia: any){
		console.log("crear registro");
	  let sql = 'INSERT INTO materias(descripcion, estado_materia) VALUES(?,?)';
	  return this.dbo.executeSql(sql, [materia.descripcion, materia.estado_materia]);
	}

	update(materia: any){
	  let sql = 'UPDATE materias SET descripcion=?, estado_materia=? WHERE id_materias=?';
	  return this.dbo.executeSql(sql, [materia.descripcion, materia.estado_materia, materia.id_materias]);
	}

	delete(materia: any){
	  let sql = 'DELETE FROM materias WHERE id_materias=?';
	  return this.dbo.executeSql(sql, [materia.id_materias]);
	}

}
