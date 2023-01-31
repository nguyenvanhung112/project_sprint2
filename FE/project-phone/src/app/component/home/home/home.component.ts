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
  p:number = 1;

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

  displayMobile(category) {
    this._productService.getListProductByCategory(category).subscribe(productList =>{
      this.productDisplayHomeList = productList;
      this.productDisplayHomeList.forEach(value => {
        value.urls = value.urls.split(',')[0];
      })
      }
    )
  }

  searchProduct(nameProduct) {
    if (nameProduct != ''){
      this._productService.searchProduct(nameProduct).subscribe(productList=>{
        this.productDisplayHomeList = productList;
        this.productDisplayHomeList.forEach(value => {
          value.urls = value.urls.split(',')[0];
        })
      })
    }else {
      this.ngOnInit();
    }
  }
}
