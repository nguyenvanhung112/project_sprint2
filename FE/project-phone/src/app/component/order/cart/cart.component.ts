import {Component, OnInit} from '@angular/core';
import * as $ from "jquery";
import {TokenService} from "../../../service/account/token.service";
import {User} from "../../../model/user/user";
import {ProductDetail} from "../../../model/product/product-detail";
import {OrderService} from "../../../service/order/order.service";
import {OrderDetail} from "../../../model/order/order-detail";

import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  user: User;
  listProductDetail: ProductDetail[];
  money: number;
  totalPrice: number = 0;
  cart: OrderDetail[];
  checkPaypal: boolean = true;

  quantity: number = 1;
  orderDetail: OrderDetail;

  constructor(private _tokenService: TokenService,
              private _orderService: OrderService,
              private _toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    this.user = JSON.parse(this._tokenService.getUser());
    console.log(this.user.id);
    this._orderService.getCart(this.user.id).subscribe(data => {
      this.cart = data;
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.totalPrice = this.totalPrice + this.cart[i].quantity * parseInt(this.cart[i].productDetail.price);
      }
    }, error => {
      this._toast.error("Không có sản phẩm nào trong giỏ hàng");
      this.clear();
    })
  }


  total() {
    if (this.cart) {
      this.totalPrice = 0;
      this.cart.forEach(value => {
        // @ts-ignore
        this.totalPrice += value.quantity * value.productDetail.price;
      })
    } else {
      this.totalPrice = 0;
    }
  }

  minus(id: number) {
    var quantity = +document.getElementById("quantity" + id).innerHTML;
    if (quantity != 1) {
      this._orderService.minus(id).subscribe(data => {
        this.totalPrice = 0;
        this.cart.forEach(value => {
          if (value.id == data.id) {
            value.quantity = data.quantity;
          }
        });
        this.total();
        // @ts-ignore
        this.money = +(this.totalPrice / 23000).toFixed(2);
      })
    }
  }

  plus(id: number) {
    this._orderService.plus(id).subscribe(data => {
      this.totalPrice = 0;
      this.cart.forEach(value => {
        if (value.id == data.id) {
          value.quantity = data.quantity;
        }
      });
      this.total();
      this.money = +(this.totalPrice / 23000).toFixed(2);
    })
  }

  delete(id: number) {
    this._orderService.delete(id).subscribe(data => {
      this.getOrder();
    })
  }

  clear() {
    this.cart = [];
    this.totalPrice = 0;
  }


}
