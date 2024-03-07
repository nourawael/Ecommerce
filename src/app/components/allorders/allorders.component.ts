import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit{

  ordersDetails:any[]=[];
  constructor(private _CartService:CartService){}
  ngOnInit(): void {
      console.log("Token:");
      console.log(localStorage.getItem('eToken'));

      this._CartService.getOrders().subscribe({
        next:(respnse)=>{
          console.log("HEREEEEEE:");
          console.log(respnse);
          this.ordersDetails=respnse
        },
        error:(err)=>{
          console.log("Error:");
          console.log(err);
        }
      });
  }
}
