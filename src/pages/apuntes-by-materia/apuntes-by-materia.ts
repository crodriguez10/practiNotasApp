import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MateriasService } from '../../providers/materias-service';
import { ApuntesService } from '../../providers/apuntes-service';
import { DatabaseService } from '../../providers/database-service';
/**
 * Generated class for the PromedioMateriasByCarrera page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-apuntes-by-materia',
  templateUrl: 'apuntes-by-materia.html',
})
export class ApuntesByMateria {
  id_materia: number;
  apuntes: any[] = []; 
  materias: any[] = []; 
  constructor(public navCtrl: NavController, public navParams: NavParams
  	,public materiasService: MateriasService,public apuntesService: ApuntesService,
  	public dataBaseService: DatabaseService,
  	) {
  	materiasService.setDbo(dataBaseService.getDbo());
  	apuntesService.setDbo(dataBaseService.getDbo());

  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromedioMateriasByCarrera');
    this.getAllMaterias();
  }

	buscarApuntes(){
		
		this.apuntesService.apuntesbyMateria(this.id_materia)
		.then(apuntes => {
      console.log("apuntes: "+apuntes);
      this.apuntes = apuntes;
    });

}
 getAllMaterias(){
    console.log("getAllmaterias");
    this.materiasService.getAll()
    .then(materias => {
      console.log("materias: "+materias);
      this.materias = materias;
    })
  }
}
