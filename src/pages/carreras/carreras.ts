import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { CarrerasService } from '../../providers/carreras-Service';
import { DatabaseService } from '../../providers/database-service';

/**
 * Generated class for the carreras page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-carreras',
  templateUrl: 'carreras.html',
})
export class CarrerasPage {

	carreras: any[] = [];	
  constructor(public navCtrl: NavController,
  		public alertCtrl: AlertController,
        public carrerasService: CarrerasService,
        public dataBaseService: DatabaseService
        ) {
    carrerasService.setDbo(dataBaseService.getDbo());
    this.navCtrl = navCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Carreras');
    this.getAllCarreras();
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.getAllCarreras();
  }

  /*
  *Traer todas las carreras
  */
  getAllCarreras(){
    console.log("getAllCarreras");
    this.carrerasService.getAll()
    .then(carreras => {
      console.log("carreras: "+carreras);
      this.carreras = carreras;
    })
  }

  openAlertNewCarreras(){
    let alert = this.alertCtrl.create({
      title: 'Crear carrera',
      message: 'escribe el nombre de la carrera',
      inputs: [
        {
          name: 'id_carrera',
          placeholder: 'Digitar id carrera.',
        },
        {
          name: 'descripcion',
          placeholder: 'Digitar descripcion carrera.',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () =>{
            console.log('cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data)=>{ 
            data.estado_carrera = 1;
            this.carrerasService.create(data)
            .then(response => {
             this.getAllCarreras();
            })
            .catch( error => {
              console.error( error );
            })
          }
        }
      ]
    });
    alert.present();
  }

  deleteCarrera(carrera: any, index){
        this.carrerasService.delete(carrera)
        .then(response =>{ 
            this.carreras.splice(index, 1)
        })
        .catch(error =>{
          console.error(error)
        });
    }


}


