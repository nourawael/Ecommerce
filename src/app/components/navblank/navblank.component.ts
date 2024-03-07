import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-navblank',
  templateUrl: './navblank.component.html',
  styleUrls: ['./navblank.component.css']
})
export class NavblankComponent implements OnInit{

  constructor(private _AuthService:AuthService ,private _CartService:CartService){}
  cartDetails:any={};
productsNumber:number=0;
ngOnInit(): void {
  this._CartService.cartNumber.subscribe({
    next:(data)=>{
      this.productsNumber=data
    }
  });
  this._CartService.getUserCart().subscribe({
    next:(response)=>{
      this.productsNumber=response.numOfCartItems;
    }
  })
  
}


  logOutUser(){
this._AuthService.logout();
  }
}
