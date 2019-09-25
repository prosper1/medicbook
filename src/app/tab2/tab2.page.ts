import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Prescription } from '../prescription';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  Prescriptions: Prescription[] = [];
  userId: string = '000';
  msg: string = 'Prescriptions'


  constructor(
    public api: ApiService,
    public loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute) {this.getPrescription()}

  
    async getPrescription() {
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      await this.api.getPrescriptions()
        .subscribe(res => {
          this.Prescriptions = res;
          console.log(this.Prescriptions)
          var userPrescription =  this.Prescriptions.filter(function(prescription) {
            return prescription.patientId == '000';
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
}
