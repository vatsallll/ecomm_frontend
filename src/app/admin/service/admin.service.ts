import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

// const BASIC_URL = 'http://localhost:8082/';
const BASIC_URL = 'http://localhost:8765/ecommproservice/';

const BASIC_URL2 = 'http://localhost:8765/ecommorderservice/';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  addCategory(categoryDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/category', categoryDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllCategories(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin', {
      headers: this.createAuthorizationHeader(),
    });
  }

  addProduct(productDto: any): Observable<any> {
    
    return this.http.post(BASIC_URL + 'api/admin/product', productDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProducts(page: number, size: number, sort: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort);
  
    return this.http.get(BASIC_URL + 'api/admin/products', {
      headers: this.createAuthorizationHeader(),
      params,
    });
  }
  

  getAllProductsByName(name: any , page: number, size: number, sort: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort);
    return this.http.get(BASIC_URL + `api/admin/search/${name}`, {
      headers: this.createAuthorizationHeader(),
      params,
    });
  }

  deleteProduct(productId: any): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(
      BASIC_URL + `api/admin/product/${productId}`, 
      {
        headers: this.createAuthorizationHeader(),
        observe: 'response', // Observe the full response
      }
    );
  }
  getProductById(productId): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  updateProduct(productId: any, productDto: any): Observable<any> {
    return this.http.put(
      BASIC_URL + `api/admin/product/${productId}`,
      productDto,
      {
        headers: this.createAuthorizationHeader(),
      }
    );
  }

  getPlacedOrders(): Observable<any> {
    return this.http.get(BASIC_URL2 + `api/admin/placedOrders`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  changeOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.get(BASIC_URL2 + `api/admin/order/${orderId}/${status}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  postFAQ(productId: number, faqDto: any): Observable<any> {
    return this.http.post(BASIC_URL + `api/admin/faq/${productId}`, faqDto, {
      headers: this.createAuthorizationHeader(),
    });
  }
  

  getAnalytics(): Observable<any> {
    return this.http.get(BASIC_URL2 + 'api/admin/order/analytics', {
      headers: this.createAuthorizationHeader(),
    });
  }
  
    getOrderedProducts(orderId: number): Observable<any> {
      return this.http.get(
        BASIC_URL2 + `api/customer/ordered-products/${orderId}`,
        {
          headers: this.createAuthorizationHeader(),
        }
      );
    }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }
}
