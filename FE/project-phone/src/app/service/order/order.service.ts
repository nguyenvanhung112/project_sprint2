import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderDetail} from "../../model/order/order-detail";
import {environment} from "../../../environments/environment";
import {OrderPhone} from "../../model/order/order-phone";
import {Payment} from "../../model/order/payment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private _httpClient: HttpClient) {
  }

  getCart(id: number): Observable<OrderDetail[]> {
    return this._httpClient.get<OrderDetail[]>(environment.orderUrl + "cart/" + id);
  }

  addOrder(orderForm: any): Observable<OrderPhone> {
    return this._httpClient.post<OrderPhone>(environment.orderUrl + "addOrder", orderForm)
  }

  getHistory(id: number): Observable<OrderDetail[]> {
    return this._httpClient.get<OrderDetail[]>(environment.orderUrl + "history/" + id);
  }

  delete(id: number): Observable<OrderDetail> {
    return this._httpClient.get<OrderDetail>(environment.orderUrl + "deleteOrderDetail/" + id);
  }

  payment(id: number): Observable<Payment> {
    return this._httpClient.get<Payment>(environment.orderUrl + "payment/" + id);
  }

  minus(id: number): Observable<OrderDetail> {
    return this._httpClient.get<OrderDetail>(environment.orderUrl + "minus/" + id)
  }

  plus(id: number): Observable<OrderDetail> {
    return this._httpClient.get<OrderDetail>(environment.orderUrl + "plus/" + id)
  }
}
