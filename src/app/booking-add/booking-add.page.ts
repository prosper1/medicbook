import { AngularFireAuth } from '@angular/fire/auth';
import { ApisService } from './../services/apis.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Doctor } from '../doctor';

@Component({
  selector: 'app-booking-add',
  templateUrl: './booking-add.page.html',
  styleUrls: ['./booking-add.page.scss'],
})
export class BookingAddPage implements OnInit {

  Doctors: Doctor[] = [];
  date;
  doctor_id: string
  id: string
  info: string
  patient_id: string
  title: string
  userId;

  constructor(private router: Router,
    private api: ApiService, private serviceAPI: ApisService, private afa: AngularFireAuth) { }

  ngOnInit() {
    this.api.getDoctors()
      .subscribe(res => {
        this.Doctors = res;
        console.log(this.Doctors);
      }, err => {
        console.log(err);
      });
  }

  // onSelect(dr:any) {
  //   var d = new Date();
  //   this.date = d.toString()

  //   var booking_data = {
  //     "date" : this.date,
  //     "doctor_id": dr,
  //     "info":"booking : 1st from mobile",
  //     "id": "0330030303030",
  //     "patient_id": "003",
  //     "title": "Booking for checkup",
  //   }
  //   this.api.addBooking(booking_data)
  //     .subscribe((res: any) => {
  //         this.router.navigate(['/']);
  //       }, (err: any) => {
  //         console.log(err);

  //       });
  // }


  onSelect(dr:any) {
    var d = new Date();
    this.date = d;

    var booking_data = {
      "date" : this.date.toString(),
      "doctor_id": dr,
      "info":"booking : 1st from mobile",
      "id": "0330030303030",
      "patient_id": this.getUserDetails(),
      "title": "Booking for checkup",
    }

    console.log('data', booking_data);

    this.serviceAPI.addBook(booking_data);
  }


  onCancel() {
    this.router.navigate(['/']);

  }

  getUserDetails() {

  return  this.userId = this.afa.auth.currentUser.uid;


  }

}
