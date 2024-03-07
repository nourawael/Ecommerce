import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ForgetpasswordService } from 'src/app/shared/services/forgetpassword.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {

  constructor(private _FormBuilder:FormBuilder, private _ForgetpasswordService:ForgetpasswordService, private _Router:Router){}

  forgetForm:FormGroup=this._FormBuilder.group(
    {
      
      email:[''],
      

     }
  );

  handleForm(){
    let userEmail=this.forgetForm.value;
   this._ForgetpasswordService.forgetPassword(userEmail).subscribe({
    next:(response)=>{
      console.log(response);
      if(response.statusMsg=='success'){
        this._Router.navigate(['/resetcode']);
      }
    }
   });
  }
}
