import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { DocentesService } from '../../providers/docentes-service';
import { DatabaseService } from '../../providers/database-service';
/**
 * Generated class for the Docentes page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-docentes',
  templateUrl: 'docentes.html',
})
export class DocentesPage {

	docentes: any[] = [];
	constructor(public navCtrl: NavController, public alertCtrl: AlertController, public dataBaseService: DatabaseService, public docentesService: DocentesService) {
		docentesService.setDbo(dataBaseService.getDbo());
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad Docentes');
		this.getAllDocentes();
	}

  /*
  *Traer todas los docentes
  */
  getAllDocentes(){
    console.log("getAlldocentes");
    this.docentesService.getAll()
    .then(docentes => {
      console.log("docentes: "+docentes);
      this.docentes = docentes;
    })
  }

  openAlertNewDocente(){
    let alert = this.alertCtrl.create({
      title: 'Registrar docente',
      message: 'escribe el nombre del docente',
      inputs: [
        {
          name: 'nombres',
          placeholder: 'Digitar nombre.',
        },
        {
          name: 'primer_apellido',
          placeholder: 'Digitar primer apellido.',
        },
        {
          name: 'segundo_apellido',
          placeholder: 'Digitar segundo apellido.',
        },
        {
          name: 'contacto_telefono',
          placeholder: 'Digitar telefono apellido.',
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
            data.estado_docente = 1;
            this.docentesService.create(data)
            .then(response => {
              this.getAllDocentes();
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

  deleteDocente(docente: any, index){
        this.docentesService.delete(docente)
        .then(response =>{ 
            this.docentes.splice(index, 1)
        })
        .catch(error =>{
          console.error(error)
        });
    }


    openAlertUpdateDocente(docente: any, index){
    let alert = this.alertCtrl.create({
      title: 'Actualizar docente',
      message: 'escribe el nombre del docente',
      inputs: [
        {
          name: 'nombres',
          value: docente.nombres,
          placeholder: 'Digitar nombre.'
        },
        {
          name: 'primer_apellido',
          value: docente.primer_apellido,
          placeholder: 'Digitar primer apellido.'
        },
        {
          name: 'segundo_apellido',
          value: docente.segundo_apellido,
          placeholder: 'Digitar segundo apellido.'
        },
        {
          name: 'contacto_telefono',
          value: docente.contacto_telefono,
          placeholder: 'Digitar telefono.'
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
          	data.id_docentes = docente.id_docentes;
            this.docentesService.update(data)
            .then(response => {
              this.getAllDocentes();
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
