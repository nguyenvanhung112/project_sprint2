import {Component, OnInit} from '@angular/core';
import {Category} from "../../../model/product/category";
import {Color} from "../../../model/product/color";
import {ProductDisplayHome} from "../../../dto/product-display-home";
import {ProductService} from "../../../service/product/product.service";
import {ImgUrlProduct} from "../../../model/product/img-url-product";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categoryList: Category[] = [];
  colorList: Color[] = [];
  productDisplayHomeList: ProductDisplayHome[] = [];


  imgProductList: ImgUrlProduct[] = [];

  constructor(private _productService: ProductService) {
  }

  ngOnInit(): void {
    this.getListProductDisplayHome();
  }

  getListProductDisplayHome() {
    this._productService.getListProductDisplayHome().subscribe(productList => {
      this.productDisplayHomeList = productList;
      this.productDisplayHomeList.forEach(value => {
        value.urls = value.urls.split(',')[0];
      })
    })
  }
}
