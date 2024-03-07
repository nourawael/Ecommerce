import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetpasswordService } from 'src/app/shared/services/forgetpassword.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {

  constructor(private _FormBuilder:FormBuilder, private _ForgetpasswordService:ForgetpasswordService, private _Router:Router){}

  resetForm:FormGroup=this._FormBuilder.group(
    {
      
      email:[''],
      newPassword:[''],
      

     }
  );

  handleForm(){
    let newDetails=this.resetForm.value;
    console.log(newDetails);
   this._ForgetpasswordService.resetPass(newDetails).subscribe({
    next:(response)=>{
      console.log(response);
      if(response.token){
        localStorage.setItem('eToken',response.token);
        this._Router.navigate(['/home']);

      }
    }
   });
  }

}
