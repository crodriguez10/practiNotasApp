import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { ApuntesService } from '../../providers/apuntes-service';
import { DatabaseService } from '../../providers/database-service';
import { CrearApuntePage } from '../crear-apunte/crear-apunte';
/**
 * Generated class for the Apuntes page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-apuntes',
  templateUrl: 'apuntes.html',
})
export class ApuntesPage {

	apuntes: any[] = [];	
  constructor(public navCtrl: NavController,
  		public alertCtrl: AlertController,
        public apuntesService: ApuntesService,
        public dataBaseService: DatabaseService
        ) {
    apuntesService.setDbo(dataBaseService.getDbo());
    this.navCtrl = navCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Apuntes');
    this.getAllApuntes();
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.getAllApuntes();
  }

  /*
  *Traer todas la materias
  */
  getAllApuntes(){
    console.log("getAllApuntes");
    this.apuntesService.getAll()
    .then(apuntes => {
      console.log("apuntes: "+apuntes);
      this.apuntes = apuntes;
    })
  }

  openAlertNewApuntes(){
    let alert = this.alertCtrl.create({
      title: 'Crear Apuntes',
      message: 'escribe el nombre de la apuntes',
      inputs: [
        {
          name: 'id_apunte',
          placeholder: 'Digitar id .',
        },
        {
          name: 'descripcion',
          placeholder: 'Digitar descripcion apunte.',
        },
        {
          name: 'apunte',
          placeholder: 'Ingresar apunte.',
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
            data.estado_apunte = 1;
            this.apuntesService.create(data)
            .then(response => {
              //this.materias.unshift( data );
              this.getAllApuntes();
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

  crearApuntes(){
    this.navCtrl.push(CrearApuntePage);
  }

  deleteApunte(apunte: any, index){
        this.apuntesService.delete(apunte)
        .then(response =>{ 
            this.apuntes.splice(index, 1)
        })
        .catch(error =>{
          console.error(error)
        });
    }


}


