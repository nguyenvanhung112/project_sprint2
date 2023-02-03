import {Color} from "../product/color";
import {StorageCapacity} from "../product/storage-capacity";
import {Product} from "../product/product";
import {ProductDetail} from "../product/product-detail";
import {OrderPhone} from "./order-phone";

export interface OrderDetail {
  id?: number;
  quantity?: number;
  productDetail?: ProductDetail;
  orderPhone?: OrderPhone;
}
