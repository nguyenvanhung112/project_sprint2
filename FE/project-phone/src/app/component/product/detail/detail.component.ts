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

  storageCapacity: string;
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
        console.log(product)
        this.getListImg(this.id)
        this.getListProductDetail(this.id)
        this.getListStorage(this.id)
      })
    })
  }

  getProductDetail(storage, color) {
    this._productService.getProductDetail(this.product.id,storage,color).subscribe(productDetail=>{
      this.productDetail = productDetail;
    })
  }

  getListImg(id) {
    this._productService.getListImgProduct(id).subscribe(listImg => {
      this.imgUrlProductList = listImg;
      console.log(listImg)
    })
  }

  getListProductDetail(id) {
    this._productService.getListProductDetail(id).subscribe(listProductDeteail => {
      this.productDetailList = listProductDeteail;
      this.productDetail = this.productDetailList[0];
      this.storageCapacity = this.productDetail.storageCapacity.name;
      this.getListColor(id)
      console.log("dung luong 1", this.productDetail.storageCapacity.name)
      console.log(listProductDeteail)
    })
  }

  getListStorage(id) {
    this._productService.getListStorageByProductId(id).subscribe(listStorage => {
      this.listStorage = listStorage;
      console.log(listStorage)
    })
  }

  getListColor(id) {
    console.log("dung luong", this.storageCapacity)
    this._productService.getListColorByProductId(id, this.storageCapacity).subscribe(colors => {
      this.listColor = colors;
      console.log(colors)
    })
  }

  getListColorChange(storage: string) {
    this._productService.getListColorByProductId(this.product.id, storage).subscribe(colors => {
      this.storageCapacity = storage;
      this.listColor = colors;
      this.getProductDetail(storage,this.listColor[0].name)
      console.log(colors)
    })
  }
}
