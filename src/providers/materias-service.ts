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
	  });
	}

	create(materia: any){
		console.log("crear registro");
	  let sql = 'INSERT INTO materias(descripcion, estado_materia) VALUES(?,?)';
	  return this.dbo.executeSql(sql, [materia.descripcion, materia.estado_materia]).
	  then(result => {
	  	this.dbo.executeSql("SELECT id_materias from materias ORDER BY id_materias DESC LIMIT 1",[]).then(response =>
	  	{
	  		console.log("response: "+response.rows.item(0).id_materias)	;
	  	 	return response.rows.item(0).id_materias;
	  	})
	  });
	}

	update(materia: any){
		console.log("update materias"+materia.id_materias);
	  	let sql = 'UPDATE materias SET descripcion=?, estado_materia=? WHERE id_materias=?';
	  	return this.dbo.executeSql(sql, [materia.descripcion, materia.estado_materia, materia.id_materias]);
	}

	delete(materia: any){
	  let sql = 'DELETE FROM materias WHERE id_materias=?';
	  return this.dbo.executeSql(sql, [materia.id_materias]);
	}

	materiasbyCarrera(id_carrera:any){
		let sql = 'select materias.descripcion as descripcion,AVG(calificaciones.nota) as promedio from materias , calificaciones , carreraMateria, corteMateria where calificaciones.id_corteMateria = corteMateria.id_corteMateria and materias.id_materias = corteMateria.id_materia and carreraMateria.id_materia = materias.id_materias  and carreraMateria.id_carrera = ? order by materias.descripcion';
		return this.dbo.executeSql(sql, [id_carrera])
		.then(response => {
	    let materias = [];
	    console.log("Response"+response.rows.length);
	    for (let index = 0; index < response.rows.length; index++) {
	      materias.push( response.rows.item(index) );
	      console.log("Item"+response.rows.item(index));
	      console.log("Item"+response.rows.item(index).descripcion);
	    }
	    return Promise.resolve( materias );
	  });
	}

}
