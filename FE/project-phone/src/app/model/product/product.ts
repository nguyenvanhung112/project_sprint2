import {Category} from "./category";
import {ImgUrlProduct} from "./img-url-product";

export interface Product {
  id?: number;
  name?: string;
  screen?: string;
  operatingSystem?: string;
  rearCamera?: string;
  frontCamera?: string;
  chip?: string;
  ram?: number;
  simCard?: string;
  battery?: string;
  description?: string;
  deleteStatus?: boolean;
  category?: Category;

}
