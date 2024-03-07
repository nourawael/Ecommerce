import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthBlankComponent } from './components/auth-blank/auth-blank.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './shared/guards/auth.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';

const routes: Routes = [
  {path:'',component:AuthBlankComponent,
  canActivate:[authGuard],
  children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'cart',component:CartComponent},
    {path:'wishList',component:WishlistComponent},
    {path:'details/:id',component:ProductDetailsComponent},
    {path:'products',component:ProductsComponent},
    {path:'allorders',component:AllordersComponent},

    {path:'payment/:id',component:PaymentComponent},

    {path:'categories',component:CategoriesComponent},
    {path:'brands',component:BrandsComponent}
  ]},
  {path:'',component:AuthLayoutComponent,children:[
    {path:'login',component:LoginComponent},
    {path:'forgerpassword',component:ForgetpasswordComponent},
    {path:'resetcode',component:VerifyCodeComponent},
    {path:'resetpassword',component:ResetpasswordComponent},
    {path:'register',component:RegisterComponent}
    
  ]},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
