import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Booking } from 'bookings';
// import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
//ToDo : Implement on init on this class 
export class Tab1Page {

  Bookings: Booking[] = [];
  userId: string = '000';
  msg: string = '';

  constructor(
    public api: ApiService,
    public loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute) {this.getBookings()}

  async getBookings() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.api.getBookings()
      .subscribe(res => {
        this.Bookings = res;
        var userBooking =  this.Bookings.filter(function(booking) {
          return booking.patient_id == '000';
        });
        this.Bookings = userBooking
        if (this.Bookings.length == 0){
          this.msg = 'You do not have any bookings'
        }

          

        console.log(this.Bookings);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

}
