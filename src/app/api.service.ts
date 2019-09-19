import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Booking } from 'bookings';
import { Prescription } from './prescription'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};
const apiUrl = 'https://hosi-app.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  //Error handler
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  getBookings(): Observable<Booking[]> {
    const url = `${apiUrl}Bookings`;
    return this.http.get<Booking[]>(url)
      .pipe(
        tap(Booking => console.log('fetched Bookings')),
        catchError(this.handleError('getBookings', []))
      );
  }
  
  getBooking(id: any): Observable<Booking> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Booking>(url).pipe(
      tap(_ => console.log(`fetched Booking id=${id}`)),
      catchError(this.handleError<Booking>(`getBooking id=${id}`))
    );
  }
  
  addBooking(Booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(apiUrl, Booking, httpOptions).pipe(
      tap((prod: Booking) => console.log(`added Booking w/ id=${prod.id}`)),
      catchError(this.handleError<Booking>('addBooking'))
    );
  }
  
  updateBooking(id: any, Booking: any): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, Booking, httpOptions).pipe(
      tap(_ => console.log(`updated Booking id=${id}`)),
      catchError(this.handleError<any>('updateBooking'))
    );
  }
  
  deleteBooking(id: any): Observable<Booking> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Booking>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Booking id=${id}`)),
      catchError(this.handleError<Booking>('deleteBooking'))
    );
  }


  getPrescriptions(): Observable<Prescription[]> {
    const url = `${apiUrl}Prescriptions`;
    return this.http.get<Prescription[]>(url)
      .pipe(
        tap(Prescription => console.log('fetched prescription')),
        catchError(this.handleError('getPrescriptions', []))
      );
  }
  
  getPrescription(id: any): Observable<Prescription> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Prescription>(url).pipe(
      tap(_ => console.log(`fetched prescription id=${id}`)),
      catchError(this.handleError<Prescription>(`getPrescrption id=${id}`))
    );
  }
  
  addPrescription(Prescription: Prescription): Observable<Prescription> {
    return this.http.post<Prescription>(apiUrl, Prescription, httpOptions).pipe(
      tap((prod: Prescription) => console.log(`added prescription w/ id=${prod.id}`)),
      catchError(this.handleError<Prescription>('addPrescription'))
    );
  }
  
  updatePrescription(id: any, Prescription: any): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, Prescription, httpOptions).pipe(
      tap(_ => console.log(`updated prescription id=${id}`)),
      catchError(this.handleError<any>('updatePrescription'))
    );
  }
  
  deletePrescription(id: any): Observable<Prescription> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Prescription>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted prescription id=${id}`)),
      catchError(this.handleError<Prescription>('deletePrescription'))
    );
  }
}
