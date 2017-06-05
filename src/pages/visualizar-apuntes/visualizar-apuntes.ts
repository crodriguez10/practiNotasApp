import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApuntesService } from '../../providers/apuntes-service';
import { DatabaseService } from '../../providers/database-service';

/**
 * Generated class for the VisualizarApuntes page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-visualizar-apuntes',
  templateUrl: 'visualizar-apuntes.html',
})
export class VisualizarApuntesPage {

  id_apunte:number;	
  apunte:any;
  image:string;
  descripcion_materia:string;
  descripcion_apunte:string;
  constructor(public navCtrl: NavController,
  			public navParams: NavParams,
  			public dataBaseService: DatabaseService,
    	public apuntesService: ApuntesService,) {
  		this.id_apunte = navParams.get('id_apunte');
  		console.log("id_apunte param: "+this.id_apunte);
  		this.apuntesService.setDbo(dataBaseService.getDbo());
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisualizarApuntes');
    this.getApunteById();
  }

	getApunteById(){
		console.log("getAllApuntes");
		this.apuntesService.getApunteById(this.id_apunte)
		.then(apunte => {
		  console.log("apunte: "+apunte);
		  this.apunte = apunte;
      this.image = apunte.adjunto;
      this.descripcion_apunte = apunte.descripcion_apunte;
      this.descripcion_materia = apunte.descripcion_materia;
		});
	}

}
