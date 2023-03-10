import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./component/home/home/home.component";
import {DetailComponent} from "./component/product/detail/detail.component";
import {ListProductComponent} from "./component/product/list-product/list-product.component";
import {ListUserComponent} from "./component/user/list-user/list-user.component";
import {LoginComponent} from "./component/security/login/login.component";
import {CartComponent} from "./component/order/cart/cart.component";
import {AuthGuard} from "./component/security/guard/auth.guard";
import {AdminGuard} from "./component/security/guard/admin.guard";
import {UserGuard} from "./component/security/guard/user.guard";
import {HistoryComponent} from "./component/user/history/history.component";
import {InfoComponent} from "./component/user/info/info.component";
import {PaymentComponent} from "./component/order/payment/payment.component";


const routes: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: "detail/:id", component: DetailComponent
  }
  ,
  {
    path: "list-products", component: ListProductComponent, canActivate: [AdminGuard]
  }
  ,
  {
    path: "list-users", component: ListUserComponent, canActivate: [AdminGuard]
  }
  ,
  {
    path: "login", component: LoginComponent
  },
  {
    path: "cart", component: CartComponent, canActivate: [AuthGuard]
  },
  {
    path: "history", component: HistoryComponent, canActivate: [AuthGuard]
  },
  {
    path: "info", component: InfoComponent, canActivate: [AuthGuard]
  },
  {
    path: "payment", component: PaymentComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
