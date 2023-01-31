import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ProductDisplayHome} from "../../dto/product-display-home";
import {ImgUrlProduct} from "../../model/product/img-url-product";
import {Product} from "../../model/product/product";
import {ProductDetail} from "../../model/product/product-detail";
import {StorageCapacity} from "../../model/product/storage-capacity";
import {Color} from "../../model/product/color";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient: HttpClient) {
  }

  getListProductDisplayHome(): Observable<ProductDisplayHome[]> {
    return this._httpClient.get<ProductDisplayHome[]>(environment.productUrl + "product-display-home");
  }

  getListImgProduct(id): Observable<ImgUrlProduct[]> {
    return this._httpClient.get<ImgUrlProduct[]>(environment.productImgUrl + id);
  }

  findProductById(id: number):Observable<Product> {
    return this._httpClient.get<Product>(environment.productUrl+ id);
  }

  getListProductDetail(id: number):Observable<ProductDetail[]>  {
      return this._httpClient.get<ProductDetail[]>(environment.productUrl + "product-detail/" + id);
  }

  getListStorageByProductId(id: number):Observable<StorageCapacity[]> {
    return this._httpClient.get<StorageCapacity[]>(environment.productUrl + "storages/" + id);

  }

  getListColorByProductId(id: number,storage:string):Observable<Color[]> {
    return this._httpClient.get<Color[]>(environment.productUrl + "color-Productdetails/?id=" + id + "&storage=" + storage);
  }

  getProductDetail(id, storage, color):Observable<ProductDetail> {
    return this._httpClient.get<ProductDetail>(environment.productUrl + "productDetail-find/?id=" + id + "&storage=" + storage + "&color=" + color);
  }

  getListProductByCategory(category):Observable<ProductDisplayHome[]> {
    return this._httpClient.get<ProductDisplayHome[]>(environment.productUrl + "product-detail/category/" + category);
  }

  searchProduct(nameProduct):Observable<ProductDisplayHome[]> {
    return this._httpClient.get<ProductDisplayHome[]>(environment.productUrl + "product-detail/search/" + nameProduct);
  }
}
