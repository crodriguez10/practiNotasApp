import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseService } from '../../providers/database-service';
import { DocentesService } from '../../providers/docentes-service';
import { MateriasService } from '../../providers/materias-service';
import { DocenteMateriaService } from '../../providers/docente-materia-service';
import { DocentesPage } from '../docentes/docentes';

/**
 * Generated class for the CrearMateriasProfesores page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-crear-materias-profesores',
  templateUrl: 'crear-materias-profesores.html',
})
export class CrearMateriasProfesoresPage {

	docentes: any[] = [];
  	formCrearMateriaProfesor: FormGroup;
	constructor(public navCtrl: NavController,
			  	public dataBaseService: DatabaseService,
			  	public materiasService: MateriasService,
			  	public docentesService: DocentesService,
			  	public docenteMateriaService: DocenteMateriaService,
			  	private fb: FormBuilder) {
		this.navCtrl = navCtrl;
		this.validations(this.fb);
		materiasService.setDbo(dataBaseService.getDbo());
		docentesService.setDbo(dataBaseService.getDbo());
		docenteMateriaService.setDbo(dataBaseService.getDbo());
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearMateriasProfesores');
    this.getAllDocentes();
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.getAllDocentes();
  }

  /*
  *Traer todas los docentes
  */
  getAllDocentes(){
    console.log("getAlldocentes");
    this.docentesService.getAll()
    .then(docentes => {
      console.log("docentes: "+docentes);
      this.docentes = docentes;
    })
  }

  validations(fb: FormBuilder){
      this.formCrearMateriaProfesor = fb.group({  
            'id_docente': ['', Validators.required],
            'descripcion': ['', Validators.required]

        });
    }


  	isValidForm(){
	    if(this.formCrearMateriaProfesor.valid){
	        return true;
	    }
	    return false;
	    
	}

	guardarMateriaDocente(data: any){
		console.log("guardarMateriaDocente"+data);
		if(this.formCrearMateriaProfesor.valid){
			console.log("guardar materia docente");
			var materia = {
				descripcion:data.descripcion,
				estado_materia: 1
			}
			console.log("materia: "+materia);
			
			var id_Materia = this.materiasService.create(materia);
			console.log("id_Materia: "+id_Materia);
			var docente = {
				id_docente:data.id_docente,
				id_Materia: id_Materia,	
				estado_docente: 1
			}
			this.docenteMateriaService.create(docente);
			this.goToBack();
		}
		
	}

	crearDocente(){
		this.navCtrl.push(DocentesPage);
	}

	goToBack(){
    	this.navCtrl.pop();
    }

}
