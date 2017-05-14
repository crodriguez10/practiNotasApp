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

	

}
