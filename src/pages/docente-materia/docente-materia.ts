import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';


@Component({
  selector: 'page-docente-materia',
  templateUrl: 'docente-materia.html',
})
export class DocenteMateriaPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocenteMateria');
  }

}
