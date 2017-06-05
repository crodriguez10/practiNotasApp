import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { CorteService } from '../../providers/corte-service';
import { DatabaseService } from '../../providers/database-service';

/**
 * Generated class for the cortes page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-cortes',
  templateUrl: 'cortes.html',
})
export class CortesPage {

  cortes: any[] = [];  
  constructor(public navCtrl: NavController,
      public alertCtrl: AlertController,
        public cortesService: CorteService,
        public dataBaseService: DatabaseService
        ) {
    cortesService.setDbo(dataBaseService.getDbo());
    this.navCtrl = navCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad cortes');
    this.getAllCortes();
  }

  

  /*
  *Traer todas las cortes
  */
  getAllCortes(){
    console.log("getAllcortes");
    this.cortesService.getAll()
    .then(cortes => {
      console.log("cortes: "+cortes);
      this.cortes = cortes;
    })
  }

  openAlertNewCorte(){
    let alert = this.alertCtrl.create({
      title: 'Crear corte',
      message: 'Ingresar corte',
      inputs: [
        {
          name: 'descripcion',
          placeholder: 'Digitar descripcion corte.',
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
            data.estadoCorte = 1;
            this.cortesService.create(data)
            .then(response => {
             this.getAllCortes();
             this.goToBack();
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

  deleteCorte(corte: any, index){
        this.cortesService.delete(corte)
        .then(response =>{ 
            this.cortes.splice(index, 1)
        })
        .catch(error =>{
          console.error(error)
        });
    }

    openAlertUpdateCorte(corte){
    let alert = this.alertCtrl.create({
      title: 'cortes',
      message: 'Modificar corte',
      inputs: [
        {
          name: 'descripcion',
          placeholder: 'Digitar descripcion corte.',
          value: corte.descripcion
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
            data.id_corte = corte.id_cortes;
            this.cortesService.update(data)
            .then(response => {
               this.getAllCortes();
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

  goToBack(){
      this.navCtrl.pop();
    }

 


}


