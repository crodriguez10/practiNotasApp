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
import { NavController, Platform, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';
var Notificaciones = (function () {
    function Notificaciones(navCtrl, platform, alertCtrl, localNotifications) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.localNotifications = localNotifications;
        this.notifications = [];
        this.notifyTime = moment(new Date()).format();
        this.chosenHours = new Date().getHours();
        this.chosenMinutes = new Date().getMinutes();
        this.days = [
            { title: 'Lunes', dayCode: 1 },
            { title: 'Martes', dayCode: 2 },
            { title: 'Miercoles', dayCode: 3 },
            { title: 'Jueves', dayCode: 4 },
            { title: 'Viernes', dayCode: 5 },
            { title: 'Sabado', dayCode: 6 },
            { title: 'Domingo', dayCode: 0 }
        ];
    }
    Notificaciones.prototype.ionViewDidLoad = function () {
    };
    Notificaciones.prototype.timeChange = function (time) {
        this.chosenHours = time.hour.value;
        this.chosenMinutes = time.minute.value;
    };
    Notificaciones.prototype.addNotifications = function () {
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
                var alert = _this.alertCtrl.create({
                    title: 'Notificacion guardada',
                    buttons: ['Ok']
                });
                alert.present();
            });
        }
    };
    Notificaciones.prototype.cancelAll = function () {
        this.localNotifications.cancelAll();
        var alert = this.alertCtrl.create({
            title: 'Notifications cancelled',
            buttons: ['Ok']
        });
        alert.present();
    };
    return Notificaciones;
}());
Notificaciones = __decorate([
    Component({
        selector: 'page-notificaciones',
        templateUrl: 'notificaciones.html',
    }),
    __metadata("design:paramtypes", [NavController,
        Platform,
        AlertController,
        LocalNotifications])
], Notificaciones);
export { Notificaciones };
//# sourceMappingURL=notificaciones.js.map