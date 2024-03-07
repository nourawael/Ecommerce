import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  cartNumber:BehaviorSubject<number>=new BehaviorSubject(0);

  userData:any;

  headers:any={token:localStorage.getItem('eToken')};

  addToCart(productId:string):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart',
    {productId:productId}
    );
  }

  getUserCart():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart'
    );
  }


  removeCartItem(itemId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`
    );
  }

  updateCartProducts(itemId:string, newCount:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`,
    {
      count:newCount
    }
    )
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`
    );
  }

  checkOut(id:string,userData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://github.com/nourawael/Ecommerce.git`,
    {
      shippingAddress:userData
    },
    );
  }

  getOrders():Observable<any>{
    if(localStorage.getItem('eToken')!=null){
      let encodedToken:any = localStorage.getItem('eToken');
      let decodedToken = jwtDecode(encodedToken);
      this.userData=decodedToken;
      console.log(this.userData);
    }
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${this.userData.id}`
    );
  }

}
