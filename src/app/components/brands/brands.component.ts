import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/shared/interfaces/product';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{

  constructor(private _EcomDataService:EcomDataService){}

  brands:Brand[]=[];
  brand:Brand={} as Brand;
  ngOnInit(): void {
    this._EcomDataService.getAllBrands().subscribe({
      next:(response)=>{
        console.log(response.data);
        this.brands=response.data;
      }
    });
  }

  getBrandDetails(id:string):void{
    this._EcomDataService.getSpecificBrand(id).subscribe({
      next:(response)=>{
        console.log(response.data);
        this.brand=response.data;
      }
    });
  }
  
}
