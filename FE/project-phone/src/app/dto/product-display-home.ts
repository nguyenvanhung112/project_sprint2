import {Category} from "../model/product/category";
import {ImgUrlProduct} from "../model/product/img-url-product";

export interface ProductDisplayHome {
  id?: number;
  name?: string;
  price?: number;
  category?: string;
  urls?: string;
}
