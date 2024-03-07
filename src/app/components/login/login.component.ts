import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _FormBuilder:FormBuilder, private _AuthService:AuthService , private _Router:Router){}


  errorMsg:string='';
  isLoading:boolean=false;

  loginForm:FormGroup=this._FormBuilder.group(
    {
      
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]],
      

     }
  );


  handleForm():void{
    console.log(this.loginForm.value);
    if(this.loginForm.valid){
      this.isLoading=true;
      this._AuthService.loginUser(this.loginForm.value).subscribe({
        next:(response)=>{
          this.isLoading=false;
          console.log(response);
          if(response.message=='success'){
            localStorage.setItem('eToken',response.token);
            this._AuthService.saveUserData();
            this._Router.navigate(['/home']);
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
