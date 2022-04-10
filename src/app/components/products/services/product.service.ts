import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = "http://localhost:3000/api/user";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  httpOptionsFOrmData = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
  };
 
  constructor(
    private http: HttpClient,
  ) { }

  addNewProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, product).pipe(
      catchError(this.handleError<any>('Add product'))
    )
  }

    getAllProducts(): Observable<any> {
      return this.http.get(`${this.apiUrl}/items`).pipe(
        catchError(this.handleError<any>('Get products'))
      )
    }

    getProduct(productId: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/product/${productId}`, this.httpOptions).pipe(
        catchError(this.handleError<any>('Get product'))
      )
    }

    updateProduct(product: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/update`, product, this.httpOptions).pipe(
        catchError(this.handleError<any>('Update product'))
      )
    }

    deleteProduct(productId: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/delete/${productId}`, this.httpOptions).pipe(
        catchError(this.handleError<any>('Delete product'))
      )
    }



    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        // TODO: send the error to remote logging infrastructure
        // console.error('aaaaaaaaaaaaaaaa',error.error.message, error); // log to console instead
  
        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
