import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseService } from '../../providers/database-service';
import { DocentesService } from '../../providers/docentes-service';
import { MateriasService } from '../../providers/materias-service';
import { CorteMateriaService } from '../../providers/corte-materia-service';
import { DocenteMateriaService } from '../../providers/docente-materia-service';
import { DocentesPage } from '../docentes/docentes';
import { CortesPage } from '../cortes/cortes';
import { CorteService } from '../../providers/corte-service';

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
	cortes: any[] = [];
  	formCrearMateriaProfesor: FormGroup;
	constructor(public navCtrl: NavController,
			  	public dataBaseService: DatabaseService,
			  	public materiasService: MateriasService,
			  	public docentesService: DocentesService,
			  	public docenteMateriaService: DocenteMateriaService,
			  	public corteMateriaService: CorteMateriaService,
			  	public cortesService: CorteService,
			  	private fb: FormBuilder) {
		this.navCtrl = navCtrl;
		this.validations(this.fb);
		materiasService.setDbo(dataBaseService.getDbo());
		docentesService.setDbo(dataBaseService.getDbo());
		docenteMateriaService.setDbo(dataBaseService.getDbo());
		corteMateriaService.setDbo(dataBaseService.getDbo());
		cortesService.setDbo(dataBaseService.getDbo());
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearMateriasProfesores');
    this.getAllDocentes();
    this.getAllCortes();
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.getAllDocentes();
    this.getAllCortes();
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

  /*
  *Traer todas las cortes
  */
  getAllCortes(){
    console.log("getAllcortes");
    this.cortesService.getAll()
    .then(cortes => {
      console.log("cortes: "+cortes);
      this.cortes = cortes;
    })
  }

  validations(fb: FormBuilder){
      this.formCrearMateriaProfesor = fb.group({  
            'id_docente': ['', Validators.required],
            'descripcion': ['', Validators.required],
            'id_cortes': ['', Validators.required]

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
			
			var id_Materia = null;
			this.materiasService.create(materia).then(response => {

				console.log("response crear registro materia middle: "+response);
				id_Materia = response;
				var docente = {
					id_docente:data.id_docente,
					id_Materia: id_Materia,	
					estado_docente: 1
				}
				
				this.docenteMateriaService.create(docente);

				console.log("data.id_cortes.length : "+data.id_cortes.length);
				for (var i = 0; i<data.id_cortes.length; i++) {
					console.log("data.id_cortes.length[i] : "+data.id_cortes[i]);
					var corteMateria = {
						id_corte: data.id_cortes[i],
						id_materia: id_Materia,
						estadoCorteMateria: 1
					}
					this.corteMateriaService.create(corteMateria);
				}
				this.goToBack();

			})
			.catch( error => {
              	console.error( error );
            });
				
		}
		
	}

	crearDocente(){
		this.navCtrl.push(DocentesPage);
	}

	crearCorte(){
		this.navCtrl.push(CortesPage);
	}
	goToBack(){
    	this.navCtrl.pop();
    }

}
