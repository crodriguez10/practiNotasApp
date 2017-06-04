import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {LocalNotifications} from '@ionic-native/local-notifications';
import { ApuntesPage } from '../apuntes/apuntes';	


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


	constructor(public navCtrl: NavController,
				public alert: AlertController,
				private localNotifications: LocalNotifications
				) {


		this.localNotifications.on("click", (notification, state) => {
		    
		    this.navCtrl.push(ApuntesPage);
		});
	}

	public addNotifications() {
        this.localNotifications.schedule({
            title: "Test Title",
            text: "Delayed Notification",
            at: new Date(new Date().getTime() + 5 * 1000),
            sound: null
        });
    }

	

}
