import {Component, OnInit} from '@angular/core';
import * as $ from "jquery";
import {ProductService} from "../../../service/product/product.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Product} from "../../../model/product/product";
import {ImgUrlProduct} from "../../../model/product/img-url-product";
import {ProductDetail} from "../../../model/product/product-detail";
import {StorageCapacity} from "../../../model/product/storage-capacity";
import {Color} from "../../../model/product/color";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  idStorage: number;
  id: number;
  product: Product;
  imgUrlProductList: ImgUrlProduct[] = [];
  productDetailList: ProductDetail[] = [];

  listStorage: StorageCapacity[] = [];

  productDetail: ProductDetail;
  listColor: Color[] = [];

  storage
  constructor(private _productService: ProductService,
              private _activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // Product Quantity
    $('.quantity button').on('click', function () {
      var button = $(this);
      var oldValue = button.parent().parent().find('input').val();
      if (button.hasClass('btn-plus')) {
        // @ts-ignore
        var newVal = parseFloat(oldValue) + 1;
      } else {
        if (oldValue > 0) {
          // @ts-ignore
          var newVal = parseFloat(oldValue) - 1;
        } else {
          newVal = 0;
        }
      }
      button.parent().parent().find('input').val(newVal);
    });

    this.getProduct();
  }

  getProduct() {
    this._activeRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get("id");
      this._productService.findProductById(this.id).subscribe(product => {
        this.product = product;
      })
      this._productService.getListImgProduct(this.id).subscribe(listImg => {
        this.imgUrlProductList = listImg;
      })
      this._productService.getListProductDetail(this.id).subscribe(listProductDeteail => {
        this.productDetailList = listProductDeteail;
        this.productDetail = this.productDetailList[0];
      })
      this._productService.getListStorageByProductId(this.id).subscribe(listStorage => {
        this.listStorage = listStorage;
      })
      this._productService.getListColorByProductId(this.id).subscribe(listColor => {
        this.listColor = listColor;
      })
    })
  }

  getProductDetail(storageId, colorId) {
  }
}
