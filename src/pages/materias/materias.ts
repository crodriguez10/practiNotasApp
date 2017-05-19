import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { MateriasService } from '../../providers/materias-service';
import { DatabaseService } from '../../providers/database-service';
import { CrearMateriasProfesoresPage } from '../crear-materias-profesores/crear-materias-profesores';

@Component({
  selector: 'page-materias',
  templateUrl: 'materias.html'
})
export class MateriasPage {

	materias: any[] = [];
    constructor(public navCtrl: NavController,
        public alertCtrl: AlertController,
        public materiasService: MateriasService,
        public dataBaseService: DatabaseService
    ) {
        materiasService.setDbo(dataBaseService.getDbo());
    }


  ionViewDidLoad(){
    this.getAllMaterias();
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.getAllMaterias();
  }

  /*
  *Traer todas la materias
  */
  getAllMaterias(){
    console.log("getAllmaterias");
    this.materiasService.getAll()
    .then(materias => {
      console.log("materias: "+materias);
      this.materias = materias;
    })
  }

  openAlertNewMateria(){
    let alert = this.alertCtrl.create({
      title: 'Crear materia',
      message: 'escribe el nombre de la materia',
      inputs: [
        {
          name: 'descripcion',
          placeholder: 'Digitar nueva materia.',
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
            data.estado_materia = 1;
            this.materiasService.create(data)
            .then(response => {
              //this.materias.unshift( data );
              this.getAllMaterias();
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

  deleteMateria(materia: any, index){
        this.materiasService.delete(materia)
        .then(response =>{ 
            this.materias.splice(index, 1)
        })
        .catch(error =>{
          console.error(error)
        });
    }

    openAlertUpdateMateria(materia: any){
    let alert = this.alertCtrl.create({
      title: 'Modificar materia',
      message: 'escribe el nombre de la materia',
      inputs: [
        {
          name: 'descripcion',
          value: materia.descripcion,
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
            data.id_materias = materia.id_materias;
            this.materiasService.update(data)
            .then(response => {
              this.getAllMaterias();
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

  crearMateriaDocente(){
    this.navCtrl.push(CrearMateriasProfesoresPage);
  }

}


