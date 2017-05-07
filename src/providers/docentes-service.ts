import { Injectable } from '@angular/core';
import { SQLiteObject  } from '@ionic-native/sqlite';

/*
  Generated class for the DocentesService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DocentesService {

  dbo: SQLiteObject;
	constructor(){
		
	}

	setDbo(dbo: SQLiteObject){
		console.log("instaciar dbo");
		this.dbo = dbo;
	}

	getAll(){
	  let sql = 'SELECT * FROM docentes';
	  console.log("consultar docentes");
	  return this.dbo.executeSql(sql, [])
	  .then(response => {
	    let docentes = [];
	    for (let index = 0; index < response.rows.length; index++) {
	      docentes.push( response.rows.item(index) );
	    }
	    return Promise.resolve( docentes );
	  })
	}

	create(docente: any){
		console.log("crear registro");
		let sql = 'INSERT INTO docentes(nombres, primer_apellido, segundo_apellido, contacto_telefono, estado_docente) VALUES(?,?,?,?,?)';
		return this.dbo.executeSql(sql, [docente.nombres, docente.primer_apellido, docente.segundo_apellido, docente.contacto_telefono, docente.estado_docente]);
	}

	update(docente: any){
		console.log("modificar docente"+docente.id_docentes);
	  let sql = 'UPDATE docentes SET nombres = ?, primer_apellido = ?, segundo_apellido = ?, contacto_telefono = ?, estado_docente = ? WHERE id_docentes=?';
	  return this.dbo.executeSql(sql, [docente.nombres, docente.primer_apellido, docente.segundo_apellido, docente.contacto_telefono, docente.estado_docente, docente.id_docentes]);
	}

	delete(docente: any){
	  let sql = 'DELETE FROM docentes WHERE id_docentes=?';
	  return this.dbo.executeSql(sql, [docente.id_docentes]);
	}

}
