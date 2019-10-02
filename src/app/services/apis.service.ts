import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApisService {


  apiUrl = 'https://hosi-app.herokuapp.com/Bookings';

  headers = {'Content-Type' : 'application/json'};

  constructor(private http: HTTP, private router: Router) { }


   addBook(book: any) {

    this.http.post(this.apiUrl, book, this.headers)
  .then(data => {

    console.log(data.status);
    console.log(data.data); // data received by server
    console.log(data.headers);

    this.router.navigateByUrl('/');

  })
  .catch(error => {

    console.log(error.status);
    console.log(error.error); // error message as string
    console.log(error.headers);
    console.log('error 1');

  });

  }
}
