import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';


@Component({
  selector: 'page-carreras',
  templateUrl: 'carreras.html',
})
export class CarrerasPage {

  constructor(public navCtrl: NavController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Carreras');
  }

}
