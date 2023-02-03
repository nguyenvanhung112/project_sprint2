import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import {TokenService} from "../../../service/account/token.service";
import {User} from "../../../model/user/user";
import {ProductDetail} from "../../../model/product/product-detail";
import {OrderService} from "../../../service/order/order.service";
import {OrderDetail} from "../../../model/order/order-detail";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  user: User;
  listProductDetail: ProductDetail[];

  cart : OrderDetail[];
  constructor(private _tokenService: TokenService,
              private _orderService: OrderService) { }

  ngOnInit(): void {

    this.getOrder();
  }

  getOrder(){
    this.user = JSON.parse(this._tokenService.getUser());
    console.log(this.user.id);
    this._orderService.getCart(this.user.id).subscribe(data=>{
      this.cart = data;
    })
  }


  minus(id: number) {

  }

  plus(id: number) {

  }
}
