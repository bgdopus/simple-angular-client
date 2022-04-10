import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = "http://localhost:3000/api/user";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  onCreateUser(userData: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/user/register`, userData, this.httpOptions).pipe(
      catchError(this.handleError<any>('create user'))
    );
  }

  onLoginUser(userData: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/user/login`, userData, this.httpOptions).pipe(
      catchError(this.handleError<any>('Login user'))
    );
  }




  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // console.log(error.message); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.toastr.error(`${operation} failed !`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
