import { Component, OnInit } from '@angular/core';
import {User} from "../../../model/user/user";
import {TokenService} from "../../../service/account/token.service";
import {Router} from "@angular/router";
import {OrderService} from "../../../service/order/order.service";
import {OrderDetail} from "../../../model/order/order-detail";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  checkLogin: boolean;
  nameAccount: any;
  currentUser: User;
  accountRole: string;
  numberOrder: number = 0;
  cart: OrderDetail[]= [];
  constructor(private _tokenService: TokenService,
              private _router: Router,
              private _orderService: OrderService) { }

  ngOnInit(): void {
    if (this._tokenService.isLogged()) {
      this.checkLogin = true;

      this.currentUser = JSON.parse(this._tokenService.getUser());
      console.log(this.currentUser.id);
      this._orderService.getCart(this.currentUser.id).subscribe(data => {
        this.cart = data;
        this.numberOrder = this.cart.length;
      })
      this.nameAccount = this.currentUser.firstName + ' ' + this.currentUser.lastName;

      const roles = this._tokenService.getRole();

      for (let i = 0; i < roles.length; i++) {
        if (roles[i] === "ROLE_ADMIN") {
          this.accountRole = "ROLE_ADMIN"
        }
      }
    }
  }

  logOut() {
    this._tokenService.logOut();
    this._router.navigateByUrl('').then(() => {
      location.reload();
    })
  }
}
