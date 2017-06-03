import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MateriasService } from '../../providers/materias-service';
import { DatabaseService } from '../../providers/database-service';
import { PendientesService } from '../../providers/pendientes-service';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { MateriasPage } from '../materias/materias';
/**
 * Generated class for the CrearPendiente page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  templateUrl: 'crear-pendiente.html',
})
export class CrearPendientePage {
	materias: any[] = [];
  	formCrearPendiente: FormGroup;
  	//image: string = null;
    days: any[];
    chosenHours: number;
   chosenMinutes: number;
  constructor(private navController: NavController, private fb: FormBuilder,
    	public materiasService: MateriasService,
    	public dataBaseService: DatabaseService,
    	public pendientesService: PendientesService){
    	//private camera: Camera) 
    	
        this.navController = navController;
        this.validations(this.fb);
        materiasService.setDbo(dataBaseService.getDbo());
        pendientesService.setDbo(dataBaseService.getDbo());
        this.days = [
           {title: 'Lunes', dayCode: 1},
           {title: 'Martes', dayCode: 2},
           {title: 'Miercoles', dayCode: 3},
           {title: 'Jueves', dayCode: 4},
           {title: 'Viernes', dayCode: 5},
           {title: 'Sabado', dayCode: 6},
           {title: 'Domingo', dayCode: 0}
       ];
       this.chosenHours = new Date().getHours();
       this.chosenMinutes = new Date().getMinutes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearPendiente');
    this.getAllMaterias();
  }
   ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.getAllMaterias();
  }
  getAllMaterias(){
	    console.log("getAllmaterias");
	    this.materiasService.getAll()
	    .then(materias => {
		      console.log("materias: "+materias);
		      this.materias = materias;
	    })
  	}

  	  guardarPendiente(data: any){ 
        if(this.formCrearPendiente.valid) {
            console.log('Submitted value: '+ data.descripcion);
            data.estado_pendiente = 1;
            this.pendientesService.create(data);
            this.goToBack();
        }
    }

    validations(fb: FormBuilder){
      this.formCrearPendiente = fb.group({  
            'id_materia': ['', Validators.required],
            'descripcion': ['', Validators.required],
            'horaEvento': ['', Validators.required],
            'diaEvento': ['', Validators.required]

        });
    }
    goToBack(){
    	this.navController.pop();
    } 
    isValidForm(){
        if(this.formCrearPendiente.valid ){
            return true;
        }
        return false;
        
    }

    timeChange(time){
this.chosenHours = time.hour.value;
     this.chosenMinutes = time.minute.value;
   }

  crearMateria(){
    this.navController.push(MateriasPage);
  }

}
