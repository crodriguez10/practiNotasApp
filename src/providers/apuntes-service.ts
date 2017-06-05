import { Injectable } from '@angular/core';
import { SQLiteObject  } from '@ionic-native/sqlite';

/*
  Generated class for the ApuntesService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApuntesService {

 dbo: SQLiteObject;
	constructor(){
		
	}

	setDbo(dbo: SQLiteObject){
		console.log("instaciar dbo");
		this.dbo = dbo;
	}

	getAll(){
	  let sql = 'SELECT * FROM apuntes';
	  console.log("consultar apuntes");
	  return this.dbo.executeSql(sql, [])
	  .then(response => {
	    let apuntes = [];
	    for (let index = 0; index < response.rows.length; index++) {
	      apuntes.push( response.rows.item(index) );
	      console.log("descripcion "+response.rows.item(index).descripcion);
	      console.log("id_materia "+response.rows.item(index).id_materia);
	    }
	    return Promise.resolve( apuntes );
	  })
	}

	create(apunte: any){
		console.log("crear registro apuntes"+apunte.adjunto);
	  let sql = 'INSERT INTO apuntes(id_materia, descripcion, adjunto, estado_apunte) VALUES(?,?,?,?)';
	  return this.dbo.executeSql(sql, [apunte.id_materia, apunte.descripcion, apunte.adjunto, apunte.estado_apunte]);
	}

	delete(apunte: any){
		console.log("eliminar apunte"+apunte.id_apuntes);
	  let sql = 'DELETE FROM apuntes WHERE id_apuntes=?';
	  return this.dbo.executeSql(sql, [apunte.id_apuntes]);
	}

	apuntesbyMateria(id_materia:any){
		 let sql = 'SELECT * FROM apuntes where id_materia= ?';
	  console.log("consultar apuntes by materia");
	  return this.dbo.executeSql(sql, [id_materia])
	  .then(response => {
	    let apuntes = [];
	    for (let index = 0; index < response.rows.length; index++) {
	      apuntes.push( response.rows.item(index) );
	    }
	    return Promise.resolve( apuntes );
	  })
	getApunteById(id_apuntes:number){
		let sql = 'SELECT adjunto, apuntes.descripcion AS descripcion_apunte, materias.descripcion AS descripcion_materia FROM apuntes, materias WHERE apuntes.id_materia = materias.id_materias AND id_apuntes = ? ';
		//let sql = 'SELECT adjunto FROM apuntes WHERE id_apuntes = ? ';
	  console.log("consultar apunte by id"+sql);
	  return this.dbo.executeSql(sql, [id_apuntes])
	  .then(response =>{
	  		console.log("response: "+response);
	  		console.log("response rows: "+response.rows);
	  		console.log("response: "+response.rows.item(0))	;
	  		console.log("response adjunto: "+response.rows.item(0).adjunto)	;
	  		console.log("response descripcion_materia: "+response.rows.item(0).descripcion_materia)	;
	  		console.log("response descripcion_apunte: "+response.rows.item(0).descripcion_apunte)	;
	  	 	return response.rows.item(0);
	  });

	}

	

	}

}
