import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<any> {
    return this.http.get<any>('https://dummyjson.com/products');
  }

  searchProducts(query: string): Observable<any> {
    return this.http.get<any>('https://dummyjson.com/products/search', {
      params: { q: query }
    });
  }

  getCategories(): Observable<any> {
    return this.http.get<any>('https://dummyjson.com/products/categories');
  }

  getProductsByCategory(query: string): Observable<any> {
    return this.http.get<any>(`https://dummyjson.com/products/category/${query}`);
  }

}
