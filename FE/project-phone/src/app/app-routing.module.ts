import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./component/home/home/home.component";
import {DetailComponent} from "./component/product/detail/detail.component";
import {ListProductComponent} from "./component/product/list-product/list-product.component";
import {ListUserComponent} from "./component/user/list-user/list-user.component";
import {LoginComponent} from "./component/security/login/login.component";
import {CartComponent} from "./component/order/cart/cart.component";


const routes: Routes = [
  {
    path: "" , component: HomeComponent
  },
  {
    path:"detail", component: DetailComponent
  }
  ,
  {
    path:"list-products", component: ListProductComponent
  }
  ,
  {
    path:"list-users", component: ListUserComponent
  }
  ,
  {
    path:"login", component: LoginComponent
  },
  {
    path:"cart", component: CartComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
