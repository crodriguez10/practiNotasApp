import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MateriasService } from '../../providers/materias-service';
import { DatabaseService } from '../../providers/database-service';
import { PendientesService } from '../../providers/pendientes-service';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { MateriasPage } from '../materias/materias';
import {LocalNotifications} from '@ionic-native/local-notifications';
import * as moment from 'moment';
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
   notifyTime: any;
    notifications: any[] = [];
    diaSeleccionado: any;
    descripcion: string;
  constructor(private navController: NavController, private fb: FormBuilder,
    	public materiasService: MateriasService,
    	public dataBaseService: DatabaseService,
    	public pendientesService: PendientesService,
      public platform: Platform,
      public localNotifications: LocalNotifications ){
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

       this.notifyTime = moment(new Date()).format();
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
            this.addNotifications();
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

  addNotifications(){
 
    let currentDate = new Date();
    let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
     console.log("this.diaSeleccionado: "+this.diaSeleccionado);
    for(let day of this.days){
         console.log("day: "+day)
        if(day.title == this.diaSeleccionado){
 
            let firstNotificationTime = new Date();
            let dayDifference = day.dayCode - currentDay;
 
            if(dayDifference < 0){
                dayDifference = dayDifference + 7; // for cases where the day is in the following week
            }
 
            firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
            firstNotificationTime.setHours(this.chosenHours);
            firstNotificationTime.setMinutes(this.chosenMinutes);
 
            console.log("descripcion: "+this.descripcion);
            let notification = {
                id: day.dayCode,
                title: 'Recuerda!',
                text: this.descripcion,
                at: firstNotificationTime,
                every: 0
            };
 
            this.notifications.push(notification);
 
        }

 
    }

    console.log("Notifications to be scheduled: ", this.notifications);
 
    if(this.platform.is('cordova')){
 
            // Cancel any existing notifications
            this.localNotifications.cancelAll().then(() => {
     
                // Schedule the new notifications
                this.localNotifications.schedule(this.notifications);
     
                //this.notifications = [];
     
     
            });
     
        }
     
    }
 
    
}
