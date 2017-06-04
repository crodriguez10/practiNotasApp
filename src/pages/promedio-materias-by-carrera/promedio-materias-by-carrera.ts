import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MateriasService } from '../../providers/materias-service';
import { CarrerasService } from '../../providers/carreras-service';
import { DatabaseService } from '../../providers/database-service';
/**
 * Generated class for the PromedioMateriasByCarrera page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-promedio-materias-by-carrera',
  templateUrl: 'promedio-materias-by-carrera.html',
})
export class PromedioMateriasByCarrera {
  id_Carrera: number;
  carreras: any[] = []; 
  materias: any[] = []; 
  constructor(public navCtrl: NavController, public navParams: NavParams
  	,public materiasService: MateriasService,public carrerasService: CarrerasService,
  	public dataBaseService: DatabaseService,
  	) {
  	materiasService.setDbo(dataBaseService.getDbo());
  	carrerasService.setDbo(dataBaseService.getDbo());

  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromedioMateriasByCarrera');
    this.getAllCarreras();
  }

	buscarMaterias(){
		
		this.materiasService.materiasbyCarrera(this.id_Carrera)
		.then(materias => {
      console.log("materias: "+materias);
      this.materias = materias;
    });

}
 getAllCarreras(){
    console.log("getAllCarreras");
    this.carrerasService.getAll()
    .then(carreras => {
      console.log("carreras: "+carreras);
      this.carreras = carreras;
    })
  }
}
