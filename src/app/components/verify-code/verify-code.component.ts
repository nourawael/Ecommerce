import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetpasswordService } from 'src/app/shared/services/forgetpassword.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent {

  constructor(private _FormBuilder:FormBuilder, private _ForgetpasswordService:ForgetpasswordService, private _Router:Router){}

  forgetForm:FormGroup=this._FormBuilder.group(
    {
      
      resetCode:[''],
      

     }
  );

  handleForm(){
    let code=this.forgetForm.value;
    console.log(code);
   this._ForgetpasswordService.verifyCode(code).subscribe({
    next:(response)=>{
      console.log(response);
      if(response.status=='Success'){
        this._Router.navigate(['/resetpassword']);
      }
    }
   });
  }
}
