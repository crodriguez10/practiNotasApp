import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
/*import { IonicPage, NavController, NavParams } from 'ionic-angular';*/
import { CalificacionesService } from '../../providers/calificaciones-service';
import { DatabaseService } from '../../providers/database-service';
import { CrearCalificacionesMateriasPage } from '../crear-calificaciones-materias/crear-calificaciones-materias';

//@IonicPage()
@Component({
  selector: 'page-calificaciones',
  templateUrl: 'calificaciones.html',
})
export class CalificacionesPage {

  calificaciones: any[] = [];
  constructor(public navCtrl: NavController, 
  	public alertCtrl: AlertController,
  	public calificacionesService: CalificacionesService,
  	public dataBaseService: DatabaseService
  	) {
  	calificacionesService.setDbo(dataBaseService.getDbo());
    this.navCtrl = navCtrl;
  }

  ionViewDidLoad() {
    this.getAllCalificaciones();
  }

  ionViewWillEnter() {
    this.getAllCalificaciones();
  }

  getAllCalificaciones(){
    console.log("getAllcalificaciones");
    this.calificacionesService.buscar()
    .then(calificaciones => {
      console.log("calificaciones: *********************"+calificaciones);
      this.calificaciones = calificaciones;
    })
  }

  openAlertNewCalificacion(){
    let alert = this.alertCtrl.create({
      title: 'Crear calificacion',
      //message: 'escribe la nota',
      inputs: [
        {
          name: 'nota',
          placeholder: 'Digitar la calificacion.',
        },
        {
          name: 'descripcion',
          placeholder: 'Digitar la descripcion.',
        }/*,
        {
          name: 'materia',
          placeholder: 'Digitar la materia de la nota.',
        }*/
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
            //data.estado_materia = 1; ----ESTO Q ?????
            this.calificacionesService.create(data)
            .then(response => {
              //this.materias.unshift( data );
              this.getAllCalificaciones();
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

  deleteCalificacion(calificacion: any, index){
        this.calificacionesService.delete(calificacion)
        .then(response =>{ 
            this.calificaciones.splice(index, 1)
        })
        .catch(error =>{
          console.error(error)
        });
    }

    openAlertUpdateCalificacion(calificacion: any){
    let alert = this.alertCtrl.create({
      title: 'Modificar calificacion',
      message: 'escribe el nombre de la materia',
      inputs: [
        {
          name: 'nota',
          value: calificacion.nota,
          placeholder: 'Digitar la calificacion.',
        },
        {
          name: 'descripcion',
          value: calificacion.descripcion,
          placeholder: 'Digitar la descripcion.',
        },
        {
          name: 'materia',
          value: calificacion.materia,
          placeholder: 'Digitar la materia de la nota.',
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
            data.id_calificaciones = calificacion.id_calificaciones;
            this.calificacionesService.update(data)
            .then(response => {
              this.getAllCalificaciones();
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

  crearCalificacionMateria(){
    console.log("abrir calificacion");
    this.navCtrl.push(CrearCalificacionesMateriasPage);
  }

}
