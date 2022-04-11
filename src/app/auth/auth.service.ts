import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  onCreateUser(userData: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/register`, userData, this.httpOptions).pipe(
      catchError(this.handleError<any>('create user'))
    );
  }

  onLoginUser(userData: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/login`, userData, this.httpOptions).pipe(
      catchError(this.handleError<any>('Login user'))
    );
  }




  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.toastr.error(`${operation} failed !`);
      return of(result as T);
    };
  }

}
