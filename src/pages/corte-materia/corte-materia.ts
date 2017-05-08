import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';


@Component({
  selector: 'page-corte-materia',
  templateUrl: 'corte-materia.html',
})
export class CorteMateriaPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CorteMateria');
  }

}
