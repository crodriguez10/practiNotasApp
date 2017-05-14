import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MateriasService } from '../../providers/materias-service';
import { DatabaseService } from '../../providers/database-service';
import { ApuntesService } from '../../providers/apuntes-service';
import { Camera, CameraOptions } from '@ionic-native/camera';


/**
 * Generated class for the CrearApunte page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  templateUrl: 'crear-apunte.html',
})
export class CrearApuntePage {

	materias: any[] = [];
  	formCrearApunte: FormGroup;
  	image: string = null;


    constructor(private navController: NavController, private fb: FormBuilder,
    	public materiasService: MateriasService,
    	public dataBaseService: DatabaseService,
    	public apuntesService: ApuntesService,
    	private camera: Camera) {
        this.navController = navController;
        this.validations(this.fb);
        materiasService.setDbo(dataBaseService.getDbo());
        apuntesService.setDbo(dataBaseService.getDbo());
        
    }

    ionViewDidLoad(){
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

    guardarApunte(data: any){ 
        if(this.formCrearApunte.valid) {
            console.log('Submitted value: '+ data.descripcion);
            data.estado_apunte = 1;
            data.adjunto = this.image;
            this.apuntesService.create(data);
            this.goToBack();
        }
    } 

    validations(fb: FormBuilder){
      this.formCrearApunte = fb.group({  
            'id_materia': ['', Validators.required],
            'descripcion': ['', Validators.required]

        });
    }

    goToBack(){
    	this.navController.pop();
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

    isValidForm(){
        if(this.formCrearApunte.valid && this.image != null){
            return true;
        }
        return false;
        
    }
	

}
