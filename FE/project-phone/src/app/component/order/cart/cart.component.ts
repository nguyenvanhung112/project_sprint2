import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import {TokenService} from "../../../service/account/token.service";
import {User} from "../../../model/user/user";
import {ProductDetail} from "../../../model/product/product-detail";
import {OrderService} from "../../../service/order/order.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  user: User;
  listProductDetail: ProductDetail[];
  constructor(private _tokenService: TokenService,
              private _orderService: OrderService) { }

  ngOnInit(): void {
    // Product Quantity
    $('.quantity button').on('click', function () {
      var button = $(this);
      var oldValue = button.parent().parent().find('input').val();
      if (button.hasClass('btn-plus')) {
        // @ts-ignore
        var newVal = parseFloat(oldValue) + 1;
      } else {
        if (oldValue > 0) {
          // @ts-ignore
          var newVal = parseFloat(oldValue) - 1;
        } else {
          newVal = 0;
        }
      }
      button.parent().parent().find('input').val(newVal);
    });
    this.getOrder();
  }

  getOrder(){
    this.user = JSON.parse(this._tokenService.getUser());
    console.log(this.user.id);

  }
}
