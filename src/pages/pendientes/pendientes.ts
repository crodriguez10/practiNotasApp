import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PendientesService } from '../../providers/pendientes-service';
import { DatabaseService } from '../../providers/database-service';
/**
 * Generated class for the Pendientes page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-pendientes',
  templateUrl: 'pendientes.html',
})
export class PendientesPage {

  pendientes: any[] = [];
	constructor(public navCtrl: NavController, public alertCtrl: AlertController, public dataBaseService: DatabaseService, public pendientesService: PendientesService) {
		pendientesService.setDbo(dataBaseService.getDbo());
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pendientes');
    this.getAllPendientes();
  }


  /*
  *Traer todas los pendientes
  */
  getAllPendientes(){
    console.log("getAllPendientes");
    this.pendientesService.getAll()
    .then(pendientes => {
      console.log("pendientes: "+pendientes);
      this.pendientes = pendientes;
    })
  }

  openAlertNewPendiente(){
    let alert = this.alertCtrl.create({
      title: 'Registrar pendiente',
      message: 'escribe el nombre del pendiente',
      inputs: [
        {
          name: 'Materia',
          placeholder: 'Digitar Materia.',
        },
        {
          name: 'Descripcion',
          placeholder: 'Digitar Descripcion.',
        },
        {
          name: 'Fecha',
          placeholder: 'Digitar Fecha.',
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
            data.estado_pendiente = 1;
            this.pendientesService.create(data)
            .then(response => {
              this.getAllPendientes();
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

 deletePendiente(pendiente: any, index){
        this.pendientesService.delete(pendiente)
        .then(response =>{ 
            this.pendientes.splice(index, 1)
        })
        .catch(error =>{
          console.error(error)
        });
    }


    openAlertUpdatePendiente(pendiente: any, index){
    let alert = this.alertCtrl.create({
      title: 'Actualizar pendiente',
      message: 'escribe el nombre del pendiente',
      inputs: [
         {
          name: 'Materia',
          value: pendiente.id_materia,
          placeholder: 'Digitar Materia.',
        },
        {
          name: 'Descripcion',
          value: pendiente.descripcion,
          placeholder: 'Digitar Descripcion.',
        },
        {
          name: 'Fecha',
          value: pendiente.fechaEvento,
          placeholder: 'Digitar Fecha.',
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
          	data.id_pendientes = pendiente.id_pendientes;
            this.pendientesService.update(data)
            .then(response => {
              this.getAllPendientes();
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












}