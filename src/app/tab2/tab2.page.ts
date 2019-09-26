import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Prescription } from '../prescription';
import { AngularFireAuth } from '@angular/fire/auth';
import { Doctor } from '../doctor'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  Prescriptions: Prescription[] = [];
  Doctors: Doctor[] = [];
  userId: string = '000';
  msg: string = 'Prescriptions'
  btnlabel: string = 'Book Doctor appointment  ..'


  constructor(
    public api: ApiService,
    public loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute,
    private afa: AngularFireAuth) {this.getPrescription()}

  
    async getPrescription() {
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      this.getUserDetails()
      await this.api.getPrescriptions()
        .subscribe(res => {
          this.Prescriptions = res;
          var _id = this.userId
          console.log(this.Prescriptions)
          var userPrescription =  this.Prescriptions.filter(function(prescription) {
            return prescription.patientId == _id;
          });

          this.Prescriptions = userPrescription

          if(this.Prescriptions.length == 0){
            this.msg = 'You dont have prescriptions'
          }
          console.log(userPrescription);
          loading.dismiss();
        }, err => {
          console.log(err);
          loading.dismiss();
        });
    }

    getUserDetails() {

      this.userId = this.afa.auth.currentUser.uid;
      console.log(this.userId)
  
    }

    onMakeBooking() {
      this.router.navigate(['/booking-add']);
      this.api.getDoctors()
        .subscribe(res => {
          this.Doctors = res;
          var _id = this.userId
          console.log(this.Doctors)
          var setDoctor =  this.Doctors.filter(function(doc) {
            return doc.prac_id == _id;
          });

          this.Doctors = setDoctor

          if(this.Doctors.length == 1){
            this.btnlabel = 'Create prescription'
          }
          console.log(this.btnlabel);
          
        }, err => {
          console.log(err);
          
        });

    }
}
