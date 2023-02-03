import {ProductDetail} from "../product/product-detail";
import {User} from "../user/user";
import {Payment} from "./payment";
import {OrderDetail} from "./order-detail";

export interface OrderPhone {
  id?: number;
  user?: User;
  payment?: Payment;
  orderDetail?: OrderDetail;
  deleteStatus?: number;

}
