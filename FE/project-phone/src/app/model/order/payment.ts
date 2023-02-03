import {User} from "../user/user";
import {OrderDetail} from "./order-detail";
import {OrderPhone} from "./order-phone";

export interface Payment {
  id?: number;
  paymentStatus?: number;
  orderPhone?: OrderPhone;
  shippingDescription?: string;
  deleteStatus?: number;
}
