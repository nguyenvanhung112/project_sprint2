import { Component, OnInit } from '@angular/core';
import {User} from "../../../model/user/user";
import {TokenService} from "../../../service/account/token.service";
import {OrderService} from "../../../service/order/order.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  user: User;
  constructor(private _tokenService: TokenService,
              private _orderService: OrderService,
              private _toast: ToastrService) { }

  ngOnInit(): void {
    this.user = JSON.parse(this._tokenService.getUser());
  }
}
