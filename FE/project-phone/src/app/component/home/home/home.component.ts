import {Component, OnInit} from '@angular/core';
import {Category} from "../../../model/product/category";
import {Color} from "../../../model/product/color";
import {ProductDisplayHome} from "../../../dto/product-display-home";
import {ProductService} from "../../../service/product/product.service";
import {ImgUrlProduct} from "../../../model/product/img-url-product";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categoryList: Category[] = [];
  colorList: Color[] = [];
  productDisplayHomeList: ProductDisplayHome[] = [];

  rfSeach: FormGroup;

  imgProductList: ImgUrlProduct[] = [];
  p: number = 1;

  constructor(private _productService: ProductService,
              private _formBuilder: FormBuilder,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    // this.getListProductDisplayHome();
    this.createSearchForm();
    this.search();
  }


  createSearchForm() {
    this.rfSeach = this._formBuilder.group({
      name: [""],
      category: [""],
      price: ["0,300000000"],
    })
  }

  search() {
    console.log(this.rfSeach.value)
    this._productService.search(this.rfSeach.value).subscribe(data => {
      this.productDisplayHomeList = data.content;
      this.productDisplayHomeList.forEach(value => {
        value.urls = value.urls.split(',')[0];
      })
    }, error => {
      this.toast.error('Không tìm thấy sản phẩm theo yêu cầu');
    })
  }

  // getListProductDisplayHome() {
  //   this._productService.getListProductDisplayHome().subscribe(productList => {
  //     this.productDisplayHomeList = productList;
  //     this.productDisplayHomeList.forEach(value => {
  //       value.urls = value.urls.split(',')[0];
  //     })
  //   }, error => {
  //     this.toast.error('Không tìm thấy sản phẩm theo yêu cầu');
  //   })
  // }

  displayMobile(category) {
    this._productService.getListProductByCategory(category).subscribe(productList => {
        this.productDisplayHomeList = productList;
        this.productDisplayHomeList.forEach(value => {
          value.urls = value.urls.split(',')[0];
        })
      }
    )
  }

  searchProduct(nameProduct) {
    if (nameProduct != '') {
      this._productService.searchProduct(nameProduct).subscribe(productList => {
        this.productDisplayHomeList = productList;
        this.productDisplayHomeList.forEach(value => {
          value.urls = value.urls.split(',')[0];
        })
      })
    } else {
      this.ngOnInit();
    }
  }
}
