import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor (private _FormBuilder:FormBuilder, private _AuthService:AuthService, private _Router:Router){}

  errorMsg:string='';
  isLoading:boolean=false;

  registerForm:FormGroup=this._FormBuilder.group(
    {
      name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(12)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]],
      rePassword:[null],
      phone:['',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]]

     },
     {validators:[this.confirmPass]} as FormControlOptions
  );

  confirmPass(group:FormGroup):void{
    let pass= group.get('password');
    let rePass= group.get('rePassword');

    if(rePass?.value == null){
      rePass?.setErrors({required:true});
    }else if(pass?.value != rePass?.value){
      rePass?.setErrors({misMatch:true});
    }
  }
  handleForm():void{
    console.log(this.registerForm.value);
    if(this.registerForm.valid){
      this.isLoading=true;
      this._AuthService.registerUser(this.registerForm.value).subscribe({
        next:(response)=>{
          this.isLoading=false;
          console.log(response);
          if(response.message=='success'){
            this._Router.navigate(['/login']);
          }
        },
        error:(err:HttpErrorResponse)=>{
          this.isLoading=false;
          this.errorMsg=err.error.message;
          console.log(err);
        }
      });
    }
  }


 
}
