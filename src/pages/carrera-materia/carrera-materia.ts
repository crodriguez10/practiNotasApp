import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';


@Component({
  selector: 'page-carrera-materia',
  templateUrl: 'carrera-materia.html',
})
export class CarreraMateriaPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarreraMateria');
  }

}
