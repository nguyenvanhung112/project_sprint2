import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../../service/account/token.service";
import {User} from "../../../model/user/user";
import {OrderDetail} from "../../../model/order/order-detail";
import {OrderService} from "../../../service/order/order.service";
import {render} from "creditcardpayments/creditCardPayments";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  user: User;
  money: number;
  totalPrice: number = 0;
  cart: OrderDetail[];
  checkPaypal: boolean = true;

  constructor(private _tokenService: TokenService,
              private _orderService: OrderService,
              private _toast: ToastrService,
              private _router: Router) { }

  ngOnInit(): void {
    this.getPayMent();
  }
  getPayMent() {
    this.user = JSON.parse(this._tokenService.getUser());
    console.log(this.user.id);
    this._orderService.getCart(this.user.id).subscribe(data => {
      this.cart = data;
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.totalPrice = this.totalPrice + this.cart[i].quantity * parseInt(this.cart[i].productDetail.price);
      }
      this.money = +(this.totalPrice / 23000).toFixed(2);
      if (this.checkPaypal) {
        this.paypal();
        this.checkPaypal = false;
      }
    })
  }

  paypal() {
    render(
      {
        id: "#myPaypalButtons",
        currency: "USD",
        value: String(this.money),
        onApprove: (details) => {
          this._orderService.payment(this.user.id).subscribe(data => {
            this._toast.success("Thanh toán thành công");
            this._router.navigateByUrl("/");
          })
        }
      }
    );
  }
}
