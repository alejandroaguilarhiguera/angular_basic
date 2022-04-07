import { Injectable, ɵisListLikeIterable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewProduct, Product, ProductAttributes } from '../_models';
import { environment } from '../../environments/environment';
import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';
import { visitAll } from '@angular/compiler';

const host: string = environment.host;

interface ResponseProduct {
  message: string;
  product: Product;
}

interface ProductPaginated {
    meta: any;
    data: Product[];
}

interface ResponseProductDetail {
    data: Product;
    meta: any;
}

  

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<ProductPaginated> {
    return this.http.get<ProductPaginated>(`${host}/products`);
  }
  

  public show(id: string): Observable<ResponseProductDetail> {
    return this.http.get<ResponseProductDetail>(`${host}/products/${id}`);
  }

  public addProduct(data: NewProduct): Observable<ResponseProduct> {
    return this.http.post<ResponseProduct>(`${host}/products`, {data });
  }

  public editProduct(id: number, data: ProductAttributes): Observable<ResponseProduct> {
    return this.http.put<ResponseProduct>(`${host}/products/${id}`, {data });
  }

  public deleteProducts(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${host}/products/${id}`);
  }

}



