import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{

  constructor(private _FormBuilder:FormBuilder, private _ActivatedRoute:ActivatedRoute
    , private _CartService:CartService, private _AuthService:AuthService){}
cartId:any='';
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          console.log(params.get('id'));
          this.cartId=params.get('id');
        }
      });
  }

  checkOut:FormGroup=this._FormBuilder.group({
    details:['',[Validators.required]],
    phone:['',[Validators.required]],
    city:['',[Validators.required]]
  });

  handleForm():void{
    console.log(this.checkOut.value);
    this._CartService.checkOut(this.cartId,this.checkOut.value).subscribe({
      next:(respone)=>{
        if(respone.status=="success"){
          console.log(respone);
          window.open(respone.session.url,'_self');
          // localStorage.setItem('eToken',respone.token);
          //   this._AuthService.saveUserData();

        }
      }
    });;
  }
}
