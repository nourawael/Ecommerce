// import { Product } from './../../shared/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  constructor(private _ActivatedRoute:ActivatedRoute, 
    private _EcomDataService:EcomDataService,
    private _CartService:CartService,
    private _WishlistService:WishlistService,
    private _ToastrService: ToastrService){}

  detailsSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  addToCart(productId:string):void{
    this._CartService.addToCart(productId).subscribe({
      next:(respone)=>{
        this._ToastrService.success(respone.message);
        console.log(respone);
      },
      error:(err)=>{
        console.log(err)
      }
    });
  }
  productDetails:Product={} as Product;
  wishListDetails:string[]=[];

  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          let productID:any=params.get('id');
          this._EcomDataService.getProductDetails(productID).subscribe({
            next:(respone)=>{
              
              this.productDetails=respone.data;
              console.log(this.productDetails);
            }
          });


          console.log(productID);
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
        console.log('whish lish hereeeeeeeeee');
        console.log(respone);
        this.wishListDetails=respone.data;
      },
      error:(err)=>{
        console.log(err)
      }
    });
  }
}
