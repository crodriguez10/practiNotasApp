import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CalificacionesService } from '../../providers/calificaciones-service';
import { DatabaseService } from '../../providers/database-service';

/**
 * Generated class for the VisualizarCalificaciones page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-visualizar-calificaciones',
  templateUrl: 'visualizar-calificaciones.html',
})
export class VisualizarCalificacionesPage {

	id_materias:number;
	calificaciones: any[] = [];
  	constructor(public navCtrl: NavController,
  				public navParams: NavParams,
  				public calificacionesService: CalificacionesService,
  				public dataBaseService: DatabaseService
  				) {
  		this.id_materias = navParams.get('id_materias');
  		this.calificacionesService.setDbo(dataBaseService.getDbo());
  	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisualizarCalificaciones');
    this.getCalificaciones();
  }

  getCalificaciones(){
  	this.calificacionesService.CalificacionesByMateriasCarrera(this.id_materias)
    .then(calificaciones=>{
    	console.log("getCalificaciones response ok"+calificaciones.length);
    	this.calificaciones = calificaciones;
    });
  }

}
