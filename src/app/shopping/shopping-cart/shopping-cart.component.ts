import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { ApiResult } from '../../shared/models/common/api-result';
import { LocalStorageKeyConst } from '../../shared/models/common/const/local-storage-key-const';
import { CheckoutReq } from '../../shared/models/shopping/shopping-cart/checkout-req';
import { GetShoppingCartItemResp } from '../../shared/models/shopping/shopping-cart/get-shopping-cart-items-resp';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    DataViewModule,
    CommonModule,
    ButtonModule,
    CardModule,
    DividerModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent implements OnInit {
  username: string = localStorage.getItem(LocalStorageKeyConst.username) ?? '';
  products: GetShoppingCartItemResp[] = [];
  total: number = 0;

  constructor(
    private router: Router,
    private http: HttpClient,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    const param = {
      username: this.username,
    };

    this.http
      .get<ApiResult<GetShoppingCartItemResp[]>>(
        'shoppingCart/getShoppingCartItems',
        { params: param }
      )
      .subscribe((apiResult) => {
        this.products = apiResult.result ?? [];

        this.products.forEach((product) => {
          this.total += product.price * product.amount;
        });
      });
  }

  removeItem(item: GetShoppingCartItemResp) {
    this.http
      .delete<ApiResult<boolean>>('shoppingCart/deleteShoppingCartItem', {
        params: {
          username: this.username,
          productId: item.id,
        },
      })
      .subscribe((apiResult) => {
        const isSuccess = apiResult.result;
        if (isSuccess) {
          location.reload();
        }
      });
  }

  checkout() {
    const param: CheckoutReq = {
      username: this.username,
    };

    this.http
      .post<ApiResult<boolean>>('shoppingCart/checkout', param)
      .subscribe((apiResult) => {
        const isSuccess = apiResult.result;
        if (isSuccess) {
          this.confirmationService.confirm({
            header: '訂單已送出',
            accept: () => {
              this.router.navigateByUrl('shopping/order');
            },
          });
        }
      });
  }
}
