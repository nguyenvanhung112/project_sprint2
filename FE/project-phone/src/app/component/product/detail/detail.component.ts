import {Component, OnInit} from '@angular/core';
import * as $ from "jquery";
import {ProductService} from "../../../service/product/product.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Product} from "../../../model/product/product";
import {ImgUrlProduct} from "../../../model/product/img-url-product";
import {ProductDetail} from "../../../model/product/product-detail";
import {StorageCapacity} from "../../../model/product/storage-capacity";
import {Color} from "../../../model/product/color";
import {TokenService} from "../../../service/account/token.service";
import {User} from "../../../model/user/user";
import {OrderService} from "../../../service/order/order.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  idStorage: number;
  user: User;
  id: number;
  product: Product;
  imgUrlProductList: ImgUrlProduct[] = [];
  productDetailList: ProductDetail[] = [];

  listStorage: StorageCapacity[] = [];

  productDetail: ProductDetail;
  listColor: Color[] = [];

  storageCapacity: string;

  cart: ProductDetail[];

  orderForm: FormGroup;

  constructor(private _productService: ProductService,
              private _activeRoute: ActivatedRoute,
              private _tokenService: TokenService,
              private _orderService: OrderService,
              private _formBuilder: FormBuilder,
              private _toast: ToastrService) {
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
        this.getListImg(this.id)
        this.getListProductDetail(this.id)
        this.getListStorage(this.id)
      })
    })
  }

  getProductDetail(storage, color) {
    this._productService.getProductDetail(this.product.id, storage, color).subscribe(productDetail => {
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
    })
  }

  getListStorage(id) {
    this._productService.getListStorageByProductId(id).subscribe(listStorage => {
      this.listStorage = listStorage;
    })
  }

  getListColor(id) {
    this._productService.getListColorByProductId(id, this.storageCapacity).subscribe(colors => {
      this.listColor = colors;
    })
  }

  getListColorChange(storage: string) {
    this._productService.getListColorByProductId(this.product.id, storage).subscribe(colors => {
      this.storageCapacity = storage;
      this.listColor = colors;
      this.getProductDetail(storage, this.listColor[0].name)
    })
  }


  getFormOrder(productDetailId,quantity,user) {
    this.orderForm = this._formBuilder.group({
      user: [user.id],
      quantity:[quantity],
      productDetail:[productDetailId]
    })
  }

  add(id, quantity) {
    this.user = JSON.parse(this._tokenService.getUser());
    console.log(this.user)
    if (this.user == null){
        this._toast.error("Bạn cần phải đăng nhập để đặt hàng")
    }
    console.log(this.user.id);
    this.getFormOrder(id,quantity,this.user)
    console.log(this.orderForm.value)
    this._orderService.addOrder(this.orderForm.value).subscribe(data=>{
      console.log(data)
    })
  }
}
