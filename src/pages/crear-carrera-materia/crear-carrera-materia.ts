import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseService } from '../../providers/database-service';
import { MateriasService } from '../../providers/materias-service';
import { CarrerasService } from '../../providers/carreras-service';
import { CarreraMateriaService } from '../../providers/carrera-materia-service';
import { MateriasPage } from '../materias/materias';

/**
 * Generated class for the CrearCarreraMateria page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-crear-carrera-materia',
  templateUrl: 'crear-carrera-materia.html',
})
export class CrearCarreraMateriaPage {

	materias: any[] = [];
  	formCrearCarreraMateria: FormGroup;
	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public dataBaseService: DatabaseService,
			  	public materiasService: MateriasService,
			  	public carrerasService: CarrerasService,
			  	public carreraMateriaService: CarreraMateriaService,
			  	private fb: FormBuilder) {
		this.navCtrl = navCtrl;
		materiasService.setDbo(dataBaseService.getDbo());
		carreraMateriaService.setDbo(dataBaseService.getDbo());
		this.validations(this.fb);
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearCarreraMateria');
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

    validations(fb: FormBuilder){
      	this.formCrearCarreraMateria = fb.group({  
            'id_materia': ['', Validators.required],
            'descripcion': ['', Validators.required]

        });
    }

    isValidForm(){
	    if(this.formCrearCarreraMateria.valid){
	        return true;
	    }
	    return false;
	    
	}

	guardarCarreraMateria(data: any){
		console.log("guardarCarreraMateria"+data);
		if(this.formCrearCarreraMateria.valid){

			var carrera = {
				descripcion:data.descripcion,
				estadoCarrera: 1
			}

			this.carrerasService.create(carrera).then(id_carrera=>{

				console.log("id_carrera crear carrera");
				console.log("data.id_materia.length: "+data.id_materia.length);
				for (var i = 0; i<data.id_materia.length; i++) {
					console.log("data.id_materia[i]: "+data.id_materia[i]);
					var carreraMateria = {
						id_carrera: id_carrera,
						id_materia: data.id_materia[i],
						estadoCarreraMateria: 1
					}
					this.carreraMateriaService.create(carreraMateria);

				}
				this.goToBack();
			});
			
		}

	}

	crearMateria(){
		this.navCtrl.push(MateriasPage);
	}

	goToBack(){
    	this.navCtrl.pop();
    }

}
