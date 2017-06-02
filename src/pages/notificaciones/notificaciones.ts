import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import {LocalNotifications} from '@ionic-native/local-notifications';
import * as moment from 'moment';
 
@Component({
  selector: 'page-notificaciones',
  templateUrl: 'notificaciones.html',
})
export class Notificaciones {
 
    notifyTime: any;
    notifications: any[] = [];
    days: any[];
    chosenHours: number;
    chosenMinutes: number;
    diaSeleccionado: any;
    descripcion: string;
 
    constructor(public navCtrl: NavController,
    			public platform: Platform,
    			public alertCtrl: AlertController,
    			public localNotifications:LocalNotifications) {
 
        this.notifyTime = moment(new Date()).format();
 
        this.chosenHours = new Date().getHours();
        this.chosenMinutes = new Date().getMinutes();
 
        this.days = [
            {title: 'Lunes', dayCode: 1},
            {title: 'Martes', dayCode: 2},
            {title: 'Miercoles', dayCode: 3},
            {title: 'Jueves', dayCode: 4},
            {title: 'Viernes', dayCode: 5},
            {title: 'Sabado', dayCode: 6},
            {title: 'Domingo', dayCode: 0}
        ];
 
    }
 
    ionViewDidLoad(){
 
    }
 
    timeChange(time){
 		this.chosenHours = time.hour.value;
    	this.chosenMinutes = time.minute.value;
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
 
            let alert = this.alertCtrl.create({
                title: 'Notificacion guardada',
                buttons: ['Ok']
            });
 
            alert.present();
 
        });
 
    }
 
}
 
    cancelAll(){
 
    this.localNotifications.cancelAll();
 
    let alert = this.alertCtrl.create({
        title: 'Notifications cancelled',
        buttons: ['Ok']
    });
 
    alert.present();
 
}
 
}
