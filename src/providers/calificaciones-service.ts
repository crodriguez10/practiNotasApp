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
	      console.log(response.rows.item(index).id_corteMateria);
	    }
	    return Promise.resolve( calificaciones );
	  })
	}

	buscar(){
	  //let sql = 'SELECT c.nota as nota,c.descripcion as descripcion,m.descripcion as materia FROM calificaciones c, corteMateria cm, materias m where c.id_corteMateria = cm.id_corteMateria and cm.id_materia = m.id_materias';
	  let sql = 'select calificaciones.nota as nota, calificaciones.descripcion as descripcion, materias.descripcion as materia from calificaciones, corteMateria, materias where calificaciones.id_corteMateria = corteMateria.id_corteMateria and corteMateria.id_materia=materias.id_materias';
	  console.log("consultar calificaciones");
	  return this.dbo.executeSql(sql, [])
	  .then(response => {
	    let calificaciones = [];
	    console.log("response.rows.length"+response.rows.length);
	    for (let index = 0; index < response.rows.length; index++) {
	      calificaciones.push( response.rows.item(index) );
	    }
	    return Promise.resolve( calificaciones );
	  }).catch(error=>{

	  	console.log("ha ocorrido un error"+error);
	  }
	  )
	}

	create(calificacion: any){
		console.log("crear registro calificaciones");
	  let sql = 'INSERT INTO calificaciones(nota, descripcion, id_corteMateria) VALUES(?,?,?)';
	  return this.dbo.executeSql(sql, [calificacion.nota,calificacion.descripcion, calificacion.id_corteMateria]);
	}

	update(calificacion: any){
		console.log("update calificaciones"+calificacion.id_calificaciones);
	  	let sql = 'UPDATE calificaciones SET nota=?, descripcion=?, id_corteMateria=? WHERE id_calificaciones=?';
	  	return this.dbo.executeSql(sql, [calificacion.nota, calificacion.descripcion,calificacion.materia, calificacion.id_calificaciones]);
	}

	delete(calificacion: any){
	  let sql = 'DELETE FROM calificaciones WHERE id_calificaciones=?';
	  return this.dbo.executeSql(sql, [calificacion.id_calificaciones]);
	}

}
