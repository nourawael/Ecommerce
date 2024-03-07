import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private _CartService:CartService){}

  cartDetails:any={};
  isEmpty:boolean=false;
  ngOnInit(): void {
      this._CartService.getUserCart().subscribe({
        next:(response)=>{
          console.log(response.data);
          this.cartDetails=response.data; //{totalCartPrice: ,products:[{coung,price,object:{}}]}
        },
        error:(err)=>{
          console.log(err);
        }
      });
  }


  removeItem(itemId:string):void{
    this._CartService.removeCartItem(itemId).subscribe({
      next:(response)=>{
        console.log(response.data);
       
       
        this.cartDetails=response.data;
        this._CartService.cartNumber.next(
          response.numOfCartItems
        );
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  changeCount(itemId:string, newCount:number):void{

    if(newCount>0){
      this._CartService.updateCartProducts(itemId,newCount).subscribe({
        next:(response)=>{
          console.log(response.data);
          this.cartDetails=response.data;
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
  }

  clearCart():void{
   this._CartService.clearCart().subscribe({
    next:(response)=>{
      console.log(response.data);
      this.cartDetails={} as any;
      this.isEmpty=true;
      this._CartService.cartNumber.next(
        0
      );
    },
    error:(err)=>{
      console.log(err);
    }
   });
  }

}
