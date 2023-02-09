import { Component, OnInit } from '@angular/core';
import {User} from "../../../model/user/user";
import {ProductDetail} from "../../../model/product/product-detail";
import {OrderDetail} from "../../../model/order/order-detail";
import {TokenService} from "../../../service/account/token.service";
import {OrderService} from "../../../service/order/order.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  user: User;
  listProductDetail: ProductDetail[];

  message: string;
  totalPrice: number = 0;
  history : OrderDetail[];
  constructor(private _tokenService: TokenService,
              private _orderService: OrderService,
              private _toast: ToastrService) { }

  ngOnInit(): void {
    this.getHistory();
  }

  getHistory(){
    this.user = JSON.parse(this._tokenService.getUser());
    console.log(this.user.id);
    this._orderService.getHistory(this.user.id).subscribe(data=>{
      this.history = data;
    },error => {
     this._toast.error("Bạn không có lịch sử thanh toán nào cả")
    })
  }

}
