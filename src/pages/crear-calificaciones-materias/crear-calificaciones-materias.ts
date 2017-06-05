import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseService } from '../../providers/database-service';
import { CalificacionesService } from '../../providers/calificaciones-service';
import { MateriasService } from '../../providers/materias-service';
import { MateriaCalificacionService } from '../../providers/materia-calificacion-service';
import { MateriasPage } from '../materias/materias';
import { CorteMateriaService } from '../../providers/corte-materia-service';

/**
 * Generated class for the CrearCalificacionesMaterias page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-crear-calificaciones-materias',
  templateUrl: 'crear-calificaciones-materias.html',
})
export class CrearCalificacionesMateriasPage {

  materias: any[] = [];
  cortes_materias: any[] = [];
  id_materia:number;
  formCrearCalificacionesMaterias: FormGroup;
  constructor(private navController: NavController,
              private fb: FormBuilder,
    	        public materiasService: MateriasService,
    	        public calificacionService: CalificacionesService,
    	        public dataBaseService: DatabaseService,
    	        public materiaCalificacionService: MateriaCalificacionService,
              public corteMateriaService: CorteMateriaService) {
        //his.formCrearCalificacionesMaterias = this.fb.group({nota:[''],});
        this.navController = navController;
        this.validations(this.fb);
        materiasService.setDbo(dataBaseService.getDbo());
        calificacionService.setDbo(dataBaseService.getDbo());
        materiaCalificacionService.setDbo(dataBaseService.getDbo());
        corteMateriaService.setDbo(dataBaseService.getDbo());
        
    }

    ionViewDidLoad() {
    console.log('ionViewDidLoad CrearCalificacionesMaterias');
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

    getCorteByIdMateria(){
      console.log("getAllApuntes");
      this.corteMateriaService.getCorteByIdMateria(this.id_materia)
      .then(cortes_materias => {
        console.log("corte_materia: "+cortes_materias);
        this.cortes_materias = cortes_materias;
      });
  }

    guardarMateriaCalificacion(data: any){ 
      console.log("guardarMateriaCalificacion"+data);
        if(this.formCrearCalificacionesMaterias.valid) {
            console.log("****guardar materia calificacion****");
            console.log('Submitted value1: '+ data.nota); 
            console.log('Submitted value2: '+ data.descripcion);
            console.log('Submitted value3: '+ data.id_materia);
            var calificacion = {
              nota:data.nota,
              descripcion:data.descripcion,
              materia:data.id_materia
            }
            console.log("calificacion: "+calificacion);

            var id_Calificacion = this.calificacionService.create(calificacion);
            console.log("id_Calificacion: "+id_Calificacion);
            var materia = {
              id_materia:data.id_materia,
              id_Calificacion: id_Calificacion
            }
            this.materiaCalificacionService.create(materia);
            this.goToBack();
        }
    }   

    crearMateria(){
    this.navController.push(MateriasPage);
    }

    validations(fb: FormBuilder){
      this.formCrearCalificacionesMaterias = fb.group({  
            'nota': ['', Validators.required],
            'id_materia': ['', Validators.required],
            'descripcion': ['', Validators.required],
            'id_corte_materia': ['', Validators.required]

        });
    }

    goToBack(){
    	this.navController.pop();
    }

    isValidForm(){
        if(this.formCrearCalificacionesMaterias.valid){
            return true;
        }
        return false;
        
    }
    onChangeMateria(){
      console.log("cambio combo materia:");
      this.getCorteByIdMateria();
    }

}
