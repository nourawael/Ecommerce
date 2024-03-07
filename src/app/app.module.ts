import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NavAuthComponent } from './components/nav-auth/nav-auth.component';
import { NavblankComponent } from './components/navblank/navblank.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { AuthBlankComponent } from './components/auth-blank/auth-blank.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchPipe } from './shared/pipes/search.pipe';
import { ToastrModule } from 'ngx-toastr';
import { PaymentComponent } from './components/payment/payment.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { MyHttpInterceptor } from './my-http.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    ProductDetailsComponent,
    NotfoundComponent,
    NavAuthComponent,
    NavblankComponent,
    AuthLayoutComponent,
    AuthBlankComponent,
    WishlistComponent,
    SearchPipe,
    PaymentComponent,
    AllordersComponent,
    ForgetpasswordComponent,
    VerifyCodeComponent,
    ResetpasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS , useClass:MyHttpInterceptor ,multi:true},
    { provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor ,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
