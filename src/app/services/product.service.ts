import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = 'http://localhost:3000'

  constructor( private http : HttpClient) {}

  postProduct(product: any){
    return this.http.post<any>(`${this.baseUrl}/productList`,product);
  }
  getProduct(){
    return this.http.get<any>(`${this.baseUrl}/productList`);
  }
  putProduct(product:any,id:number){
    return this.http.put<any>(`${this.baseUrl}/productList/${id}`,product)
  }
  deleteProduct(id:number){
    return this.http.delete<any>(`${this.baseUrl}/productList/${id}`)
  }
}

