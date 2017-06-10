import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseService } from '../../providers/database-service';
import { CalificacionesService } from '../../providers/calificaciones-service';
import { MateriasService } from '../../providers/materias-service';
import { MateriaCalificacionService } from '../../providers/materia-calificacion-service';
import { MateriasPage } from '../materias/materias';
import { CorteMateriaService } from '../../providers/corte-materia-service';
import { CorteService } from '../../providers/corte-service';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  image: string = null;
  formCrearCalificacionesMaterias: FormGroup;
  constructor(private navController: NavController,
              private fb: FormBuilder,
    	        public materiasService: MateriasService,
    	        public calificacionService: CalificacionesService,
    	        public dataBaseService: DatabaseService,
    	        public materiaCalificacionService: MateriaCalificacionService,
              public corteMateriaService: CorteMateriaService,
              public cortesService: CorteService,
              private camera: Camera) {
        //his.formCrearCalificacionesMaterias = this.fb.group({nota:[''],});
        this.navController = navController;
        this.validations(this.fb);
        materiasService.setDbo(dataBaseService.getDbo());
        calificacionService.setDbo(dataBaseService.getDbo());
        materiaCalificacionService.setDbo(dataBaseService.getDbo());
        corteMateriaService.setDbo(dataBaseService.getDbo());
        cortesService.setDbo(dataBaseService.getDbo());
        
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

    /*
  *Traer todas las cortes
  */
  getAllCortes(){
    console.log("getAllcortes");
    this.cortesService.getAll()
    .then(cortes => {
      console.log("cortes: "+cortes);
      this.cortes_materias = cortes;
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
              id_corteMateria:data.id_corte_materia,
              soporte_nota: this.image
            }
            console.log("calificacion: "+calificacion.nota+" descripcion:"+calificacion.descripcion+" id_corteMateria"+calificacion.id_corteMateria);

            this.calificacionService.create(calificacion);
            
            /*var materia = {
              id_materia:data.id_materia,
              id_Calificacion: id_Calificacion
            }
            this.materiaCalificacionService.create(materia);*/
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

    getPicture(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI
    }

    this.camera.getPicture( options )
      .then(imageData => {
          this.image = imageData;
          console.log("imageData: "+imageData)
      })
      .catch(error =>{
          console.error( error );
      });
  }

}
