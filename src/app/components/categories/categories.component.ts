import { Component, OnInit } from '@angular/core';
import { Category, Subcategory } from 'src/app/shared/interfaces/product';
import { EcomDataService } from 'src/app/shared/services/ecom-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private _EcomDataService:EcomDataService){}
  categories:Category[]=[];
  subCategories:Subcategory[]=[];
  Category:Category={} as Category;

  ngOnInit(): void {
  
    this._EcomDataService.getAllCaegories().subscribe({
      next:(response)=>{
        console.log(response.data);
        this.categories=response.data;
      }
    });
}

getSubCategory(id:string):void{
  this._EcomDataService.getCategorySubCategories(id).subscribe({
    next:(response)=>{
      console.log(response.data);
      this.subCategories=response.data;
    }
  });
}

getCategory(id:string):void{
  this._EcomDataService.getSpecificCategory(id).subscribe({
    next:(response)=>{
      console.log(response.data);
      this.Category=response.data;
    }
  });
}
}
