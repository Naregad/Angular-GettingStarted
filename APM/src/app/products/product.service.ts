import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import {catchError, tap} from 'rxjs/operators';
import { IProduct } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    //Use a file rather than an http call for this project.
    //This file path is registered in angular.json under assets.
    private productUrl = 'api/products/products.json';

    constructor(private http:HttpClient) {}

    getProducts() : Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
          tap(data => console.log("All: " + JSON.stringify(data))),
          catchError(this.handleError)  
        );
    }

    
    handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            //A client side or network error occured.
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            //The backend returned an unsuccesful resonse code.
            errorMessage = `Server returned code: ${err.status}, error message: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);    
    }
}