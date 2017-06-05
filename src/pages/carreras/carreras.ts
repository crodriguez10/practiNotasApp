import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { CarrerasService } from '../../providers/carreras-service';
import { DatabaseService } from '../../providers/database-service';
import { CrearCarreraMateriaPage } from '../crear-carrera-materia/crear-carrera-materia';

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

  openAlertNewCarrera(){
    let alert = this.alertCtrl.create({
      title: 'Crear carrera',
      message: 'Ingresar carrera',
      inputs: [
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
            data.estadoCarrera = 1;
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

    openAlertUpdateCarrera(carrera){
    let alert = this.alertCtrl.create({
      title: 'Carreras',
      message: 'Modificar carrera',
      inputs: [
        {
          name: 'descripcion',
          placeholder: 'Digitar descripcion carrera.',
          value: carrera.descripcion
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
          text: 'Modificar',
          handler: (data)=>{ 
            data.id_carreras = carrera.id_carreras;
            this.carrerasService.update(data)
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

  crearCarrera(){
    this.navCtrl.push(CrearCarreraMateriaPage);
  }


}


