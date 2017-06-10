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
	  let sql = 'select calificaciones.id_calificaciones, calificaciones.nota as nota, calificaciones.descripcion as descripcion, materias.descripcion as materia from calificaciones, corteMateria, materias where calificaciones.id_corteMateria = corteMateria.id_corteMateria and corteMateria.id_materia=materias.id_materias';
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
	  let sql = 'INSERT INTO calificaciones(nota, descripcion, id_corteMateria, soporte_nota) VALUES(?,?,?,?)';
	  return this.dbo.executeSql(sql, [calificacion.nota,calificacion.descripcion, calificacion.id_corteMateria, calificacion.soporte_nota]);
	}

	update(calificacion: any){
		console.log("update calificaciones"+calificacion.id_calificaciones);
	  	let sql = 'UPDATE calificaciones SET nota=?, descripcion=?, id_corteMateria=?, soporte_nota=? WHERE id_calificaciones=?';
	  	return this.dbo.executeSql(sql, [calificacion.nota, calificacion.descripcion,calificacion.materia, calificacion.id_calificaciones, calificacion.soporte_nota]);
	}

	delete(calificacion: any){
		console.log('eliminar calificaicion'+calificacion.id_calificaciones);
	  	let sql = 'DELETE FROM calificaciones WHERE id_calificaciones=?';
	  	return this.dbo.executeSql(sql, [calificacion.id_calificaciones]);
	}

	CalificacionesByMateriasCarrera(id_materias:any){
		console.log("CalificacionesByMateriasCarrera: "+id_materias);
		let sql = 'select corte.descripcion as descripcion_corte, calificaciones.nota, calificaciones.soporte_nota from corte , calificaciones, corteMateria where calificaciones.id_corteMateria = corteMateria.id_corteMateria and corte.id_corte = corteMateria.id_corte and  corteMateria.id_materia = ? ';
		return this.dbo.executeSql(sql, [id_materias])
		.then(response => {
			console.log("response consulta detalle calificaciones"+response);
		    let calificaciones = [];
		    console.log("Response CalificacionesByMateriasCarrera"+response.rows.length);
		    for (let index = 0; index < response.rows.length; index++) {
		      calificaciones.push( response.rows.item(index) );
		      console.log("response calificaicones"+response.rows.item(index));
		      console.log("descripcion corte: "+response.rows.item(index).descripcion_corte);
		      console.log("nota: "+response.rows.item(index).nota);
		      console.log("soporte_nota: "+response.rows.item(index).soporte_nota);
		    }
	    	return Promise.resolve( calificaciones );
	  });
	}

}
