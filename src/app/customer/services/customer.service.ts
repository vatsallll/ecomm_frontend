import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

const BASIC_URL1 = 'http://localhost:8765/ecommproservice/';

const BASIC_URL2 = 'http://localhost:8765/ecommorderservice/';

const BASIC_URL3 = 'http://localhost:8765/ecomm/';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  
  constructor(private http: HttpClient) {}


  getUserProfile() {
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL2 + `api/customer/GetUser/${userId}`,  {
      headers: this.createAuthorizationHeader(),
    });
    

    
  }
  
  ChangeUsername(result: string) : Observable<any> {
    console.log("hello");
    const userId = UserStorageService.getUserId();
    
    return this.http.post(
      BASIC_URL2 + `api/customer/changeusername/${userId}`,
      { username: result }, 
      { headers: this.createAuthorizationHeader() }
    );
  }
  getAllProducts(page: number, size: number, sort: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort);
  
    return this.http.get(BASIC_URL1 + 'api/admin/products', {
      headers: this.createAuthorizationHeader(),
      params,
    });
  }
  

  changePassword( passwordData: { oldPassword: string, newPassword: string }): Observable<any> {
    const userId = UserStorageService.getUserId();
    // console.log(passwordData.newPassword);
    // console.log(passwordData.oldPassword);
    const url = BASIC_URL3 + `changepassword/${userId}`;
    return this.http.post(url, passwordData, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getAuthToken()  // Add authorization header if needed
      })
    });
  }

  giveReview(reviewDto: any): Observable<any> {
    return this.http.post(BASIC_URL2 + `api/customer/review`, reviewDto, {
      headers: this.createAuthorizationHeader(),
    });
  }
  private getAuthToken(): string {
    console.log(localStorage.getItem('ecom-token'));
    return localStorage.getItem('ecom-token') 
  }

  getAllProductsByName(name: any,page: number, size: number, sort: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort);
    return this.http.get(BASIC_URL1 + `api/admin/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addToCart(productId: any): Observable<any> {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId(),
    };
    console.log(cartDto.productId);
    console.log(cartDto.userId);
    return this.http.post(BASIC_URL2 + `api/customer/cart`, cartDto, {
      headers: this.createAuthorizationHeader(),
    });
  }
  increaseProductQuantity(productId: any): Observable<any> {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId(),
    };
    return this.http.post(BASIC_URL2 + `api/customer/addition`, cartDto, {
      headers: this.createAuthorizationHeader(),
    });
  }


  getquantity(productId: number): Observable<any> {
    return this.http.get(
      BASIC_URL2 + `api/customer/quantity/${productId}`,
      {
        headers: this.createAuthorizationHeader(),
      }
    );
  }

  getcartquantity(productId:number , quantity : number,idd : number): Observable<any>{
    const userId = UserStorageService.getUserId()
    return this.http.get(
      BASIC_URL2 + `api/customer/getquantity/${productId}/${quantity}/${userId}/${idd}`,
      {
        headers: this.createAuthorizationHeader(),
      }
    );
  }

  postquantity(productId:number , quantity : number,idd : number): Observable<any>{
    const userId =  UserStorageService.getUserId()
    return this.http.get(
      BASIC_URL2 + `api/customer/postquantity/${productId}/${quantity}/${userId}/${idd}`,
      {
        headers: this.createAuthorizationHeader(),
      }
    );
  }
 
  getOrderedProducts(orderId: number): Observable<any> {
    return this.http.get(
      BASIC_URL2 + `api/customer/ordered-products/${orderId}`,
      {
        headers: this.createAuthorizationHeader(),
      }
    );
  }
  decreaseProductQuantity(productId: any): Observable<any> {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId(),
    };
    return this.http.post(BASIC_URL2 + `api/customer/deduction`, cartDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getCartByUserId(): Observable<any> {
    
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL2 + `api/customer/cart/${userId}`,  {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteProduct(productId: any): Observable<any> {
    const cartDto = {
        productId: productId,
        userId: UserStorageService.getUserId(),
    };
    return this.http.delete(BASIC_URL2 + `api/customer/delete`, {
      headers: this.createAuthorizationHeader(),
      body : cartDto
    });
}

placeOrder(OrderDto:any): Observable<any> {
  OrderDto.userId = UserStorageService.getUserId();
  console.log("hello");
  return this.http.post(BASIC_URL2 + `api/customer/placeOrder`,OrderDto, {
    headers: this.createAuthorizationHeader(),
  });
}
getOrdersByUserId(): Observable<any> {
  const userId = UserStorageService.getUserId();
  return this.http.get(BASIC_URL2 + `api/customer/myOrders/${userId}`, {
    headers: this.createAuthorizationHeader(),
  });
}

addProductToWishlist(wishlistDto: any): Observable<any> {
  return this.http.post(BASIC_URL2 + `api/customer/wishlist`, wishlistDto, {
    headers: this.createAuthorizationHeader(),
  });
}

getProductDetailById(productId: number): Observable<any> {
  return this.http.get(BASIC_URL1 + `api/customer/product/${productId}`, {
    headers: this.createAuthorizationHeader(),
  });
}

getWishlistByUserId(): Observable<any> {
  const userId = UserStorageService.getUserId();
  return this.http.get(BASIC_URL2 + `api/customer/wishlist/${userId}`,  {
    headers: this.createAuthorizationHeader(),
  });
}


RemoveFromWishlist(id : any): Observable<any> {
  const userId = UserStorageService.getUserId();
  return this.http.get(BASIC_URL2 + `api/customer/removewishlist/${id}`,  {
    headers: this.createAuthorizationHeader(),
  });
}

updateproductquantity(id :any) : Observable<any> {
 
  return this.http.get(BASIC_URL2 + `api/customer/updateproductquantity/${id}`,  {
    headers: this.createAuthorizationHeader(),
  });

}

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }
}
