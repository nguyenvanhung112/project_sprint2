import {Color} from "./color";
import {StorageCapacity} from "./storage-capacity";
import {Product} from "./product";

export interface ProductDetail {
  id?: number;
  price?: string;
  quantity?: number;
  color?: Color;
  storageCapacity?: StorageCapacity;
  product?: Product;
  deleteStatus?: boolean;
}
