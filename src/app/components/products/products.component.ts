import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';
import { NavblankComponent } from '../navblank/navblank.component';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  constructor(private _EcomDataService:EcomDataService
    , private _CartService:CartService,private _ToastrService: ToastrService,
    private _WishlistService:WishlistService){}

  products:Product[]=[];
  wishListDetails:string[]=[];

  searchTerm:string='';
  
  addToCart(productId:string):void{
    this._CartService.addToCart(productId).subscribe({
      next:(respone)=>{
        console.log(respone);
        this._ToastrService.success(respone.message);
        this._CartService.cartNumber.next(respone.numOfCartItems);
      },
      error:(err)=>{
        console.log(err)
      }
    });
  }
  
  ngOnInit(): void {
      this._EcomDataService.getAllData().subscribe({
        next:(response)=>{
          console.log(response.data);
          this.products=response.data;
        }
      });

      this._WishlistService.getUserWishList().subscribe({
        next:(response)=>{
         const newData = response.data.map((item:any)=>item._id);
         this.wishListDetails=newData;
        },
        error:(err)=>{
          console.log(err);
        }
      });
      
  }

  addToWishList(productId:string):void{
    this._WishlistService.addToWishList(productId).subscribe({
      next:(respone)=>{
        console.log(respone);
        this.wishListDetails=respone.data;
      },
      error:(err)=>{
        console.log(err)
      }
    });
  }
}
