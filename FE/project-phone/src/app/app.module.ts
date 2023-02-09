import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home/home.component';
import { FooterComponent } from './component/home/footer/footer.component';
import { HeaderComponent } from './component/home/header/header.component';
import { DetailComponent } from './component/product/detail/detail.component';
import { AddProductComponent } from './component/product/add-product/add-product.component';
import { EditProductComponent } from './component/product/edit-product/edit-product.component';
import { ListProductComponent } from './component/product/list-product/list-product.component';
import { ListUserComponent } from './component/user/list-user/list-user.component';
import { RegisterUserComponent } from './component/user/register-user/register-user.component';
import { LoginComponent } from './component/security/login/login.component';
import { CartComponent } from './component/order/cart/cart.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HistoryComponent } from './component/user/history/history.component';
import { InfoComponent } from './component/user/info/info.component';
import { PaymentComponent } from './component/order/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    DetailComponent,
    AddProductComponent,
    EditProductComponent,
    ListProductComponent,
    ListUserComponent,
    RegisterUserComponent,
    LoginComponent,
    CartComponent,
    HistoryComponent,
    InfoComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
