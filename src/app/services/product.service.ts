import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.';
const baseUrl='http://localhost:8080/api/products';
const baseUrlForSearch="http://localhost:8080/api/products/search/findByNomContaining?"
@Injectable({
  providedIn: 'root'
})




export class ProductService {
    constructor(private http: HttpClient) { }
    getAll(): Observable<Product[]> {
      return this.http.get<Product[]>(baseUrl);
    }
    get(url:string):Observable<Product>{
      return this.http.get(url);
    }
    create (data:any):Observable<any>{
      return this.http.post(baseUrl,data);
    }
    update(url:any, data:any):Observable<any>{
      return this.http.put(url,data);
    }
    delete(url :any):Observable<any>{
      return this.http.delete(url);
    }
    deleteAll():Observable<any>{
      return this.http.delete(baseUrl);
    }
    findByNum(num: any): Observable<Product[]> {
      return this.http.get<Product[]>(baseUrlForSearch+'nom='+num);
    }



}
