var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { MateriasService } from '../../providers/materias-service';
import { DatabaseService } from '../../providers/database-service';
import { PendientesService } from '../../providers/pendientes-service';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { MateriasPage } from '../materias/materias';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';
/**
 * Generated class for the CrearPendiente page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CrearPendientePage = (function () {
    function CrearPendientePage(navController, fb, materiasService, dataBaseService, pendientesService, platform, localNotifications) {
        //private camera: Camera) 
        this.navController = navController;
        this.fb = fb;
        this.materiasService = materiasService;
        this.dataBaseService = dataBaseService;
        this.pendientesService = pendientesService;
        this.platform = platform;
        this.localNotifications = localNotifications;
        this.materias = [];
        this.notifications = [];
        this.navController = navController;
        this.validations(this.fb);
        materiasService.setDbo(dataBaseService.getDbo());
        pendientesService.setDbo(dataBaseService.getDbo());
        this.days = [
            { title: 'Lunes', dayCode: 1 },
            { title: 'Martes', dayCode: 2 },
            { title: 'Miercoles', dayCode: 3 },
            { title: 'Jueves', dayCode: 4 },
            { title: 'Viernes', dayCode: 5 },
            { title: 'Sabado', dayCode: 6 },
            { title: 'Domingo', dayCode: 0 }
        ];
        this.chosenHours = new Date().getHours();
        this.chosenMinutes = new Date().getMinutes();
        this.notifyTime = moment(new Date()).format();
    }
    CrearPendientePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CrearPendiente');
        this.getAllMaterias();
    };
    CrearPendientePage.prototype.ionViewWillEnter = function () {
        console.log("ionViewWillEnter");
        this.getAllMaterias();
    };
    CrearPendientePage.prototype.getAllMaterias = function () {
        var _this = this;
        console.log("getAllmaterias");
        this.materiasService.getAll()
            .then(function (materias) {
            console.log("materias: " + materias);
            _this.materias = materias;
        });
    };
    CrearPendientePage.prototype.guardarPendiente = function (data) {
        if (this.formCrearPendiente.valid) {
            console.log('Submitted value: ' + data.descripcion);
            data.estado_pendiente = 1;
            this.pendientesService.create(data);
            this.addNotifications();
            this.goToBack();
        }
    };
    CrearPendientePage.prototype.validations = function (fb) {
        this.formCrearPendiente = fb.group({
            'id_materia': ['', Validators.required],
            'descripcion': ['', Validators.required],
            'horaEvento': ['', Validators.required],
            'diaEvento': ['', Validators.required]
        });
    };
    CrearPendientePage.prototype.goToBack = function () {
        this.navController.pop();
    };
    CrearPendientePage.prototype.isValidForm = function () {
        if (this.formCrearPendiente.valid) {
            return true;
        }
        return false;
    };
    CrearPendientePage.prototype.timeChange = function (time) {
        this.chosenHours = time.hour.value;
        this.chosenMinutes = time.minute.value;
    };
    CrearPendientePage.prototype.crearMateria = function () {
        this.navController.push(MateriasPage);
    };
    CrearPendientePage.prototype.addNotifications = function () {
        var _this = this;
        var currentDate = new Date();
        var currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
        console.log("this.diaSeleccionado: " + this.diaSeleccionado);
        for (var _i = 0, _a = this.days; _i < _a.length; _i++) {
            var day = _a[_i];
            console.log("day: " + day);
            if (day.title == this.diaSeleccionado) {
                var firstNotificationTime = new Date();
                var dayDifference = day.dayCode - currentDay;
                if (dayDifference < 0) {
                    dayDifference = dayDifference + 7; // for cases where the day is in the following week
                }
                firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
                firstNotificationTime.setHours(this.chosenHours);
                firstNotificationTime.setMinutes(this.chosenMinutes);
                console.log("descripcion: " + this.descripcion);
                var notification = {
                    id: day.dayCode,
                    title: 'Recuerda!',
                    text: this.descripcion,
                    at: firstNotificationTime,
                    every: 0
                };
                this.notifications.push(notification);
            }
        }
        console.log("Notifications to be scheduled: ", this.notifications);
        if (this.platform.is('cordova')) {
            // Cancel any existing notifications
            this.localNotifications.cancelAll().then(function () {
                // Schedule the new notifications
                _this.localNotifications.schedule(_this.notifications);
                //this.notifications = [];
            });
        }
    };
    return CrearPendientePage;
}());
CrearPendientePage = __decorate([
    Component({
        templateUrl: 'crear-pendiente.html',
    }),
    __metadata("design:paramtypes", [NavController, FormBuilder,
        MateriasService,
        DatabaseService,
        PendientesService,
        Platform,
        LocalNotifications])
], CrearPendientePage);
export { CrearPendientePage };
//# sourceMappingURL=crear-pendiente.js.map