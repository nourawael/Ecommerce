import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private _WishlistService:WishlistService,
    private _CartService:CartService,
    private _ToastrService: ToastrService){}

  wishListDetails:any={};
  ngOnInit(): void {
    // console.log("Entered wish list");
      this._WishlistService.getUserWishList().subscribe({
        next:(response)=>{
          console.log("Response.data");

          console.log(response.data);
          this.wishListDetails=response.data; //{totalCartPrice: ,products:[{coung,price,object:{}}]}
        },
        error:(err)=>{
          console.log(err);
        }
      });
  }

  updateWish():void{
    this._WishlistService.getUserWishList().subscribe({
      next:(response)=>{
        console.log("Response.data");

        console.log(response.data);
        this.wishListDetails=response.data; //{totalCartPrice: ,products:[{coung,price,object:{}}]}
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  removeItem(itemId:string):void{
    this._WishlistService.removeWishListtItem(itemId).subscribe({
      next:(response)=>{

        console.log("removeitem response");

        console.log(response.data);
       
       this.updateWish();
        // this.wishListDetails=response.data;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  addToCart(productId:string):void{
    this._CartService.addToCart(productId).subscribe({
      next:(respone)=>{
        this._ToastrService.success(respone.message);
        
        this._CartService.cartNumber.next(respone.numOfCartItems);

        console.log(respone);
      },
      error:(err)=>{
        console.log(err)
      }
    });
  }
}
