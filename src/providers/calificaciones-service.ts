import { Injectable } from '@angular/core';
import { SQLiteObject  } from '@ionic-native/sqlite';

/*
  Generated class for the CalificacionesService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CalificacionesService {

  dbo: SQLiteObject;
	constructor(){
		
	}

	setDbo(dbo: SQLiteObject){
		console.log("instaciar dbo");
		this.dbo = dbo;
	}

	getAll(){
	  let sql = 'SELECT * FROM calificaciones';
	  console.log("consultar calificaciones");
	  return this.dbo.executeSql(sql, [])
	  .then(response => {
	    let calificaciones = [];
	    for (let index = 0; index < response.rows.length; index++) {
	      calificaciones.push( response.rows.item(index) );
	    }
	    return Promise.resolve( calificaciones );
	  })
	}

	buscar(){
	  let sql = 'SELECT c.nota as nota,c.descripcion as descripcion,m.descripcion as materia FROM calificaciones c,materias m where c.materia = m.id_materias';
	  console.log("consultar calificaciones");
	  return this.dbo.executeSql(sql, [])
	  .then(response => {
	    let calificaciones = [];
	    for (let index = 0; index < response.rows.length; index++) {
	      calificaciones.push( response.rows.item(index) );
	    }
	    return Promise.resolve( calificaciones );
	  })
	}

	create(calificacion: any){
		console.log("crear registro");
	  let sql = 'INSERT INTO calificaciones(nota, descripcion, materia) VALUES(?,?,?)';
	  return this.dbo.executeSql(sql, [calificacion.nota,calificacion.descripcion, calificacion.materia]);
	}

	update(calificacion: any){
		console.log("update calificaciones"+calificacion.id_calificaciones);
	  	let sql = 'UPDATE calificaciones SET nota=?, descripcion=?, materia=? WHERE id_calificaciones=?';
	  	return this.dbo.executeSql(sql, [calificacion.nota, calificacion.descripcion,calificacion.materia, calificacion.id_calificaciones]);
	}

	delete(calificacion: any){
	  let sql = 'DELETE FROM calificaciones WHERE id_calificaciones=?';
	  return this.dbo.executeSql(sql, [calificacion.id_calificaciones]);
	}

}
