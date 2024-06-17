import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ApiResult } from '../../shared/models/common/api-result';
import { LocalStorageKeyConst } from '../../shared/models/common/const/local-storage-key-const';
import { AddShoppingCartReq } from '../../shared/models/shopping/add-shopping-cart-req';
import { GetProductInfoResp } from '../../shared/models/shopping/get-product-info-resp';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css',
})
export class ProductInfoComponent implements OnInit {
  product: GetProductInfoResp | null = null;
  id: number = 0;
  amount: number = 1;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);

      this.http
        .get<ApiResult<GetProductInfoResp | null>>('shopping/getProductInfo', {
          params: { id: this.id },
        })
        .subscribe((apiResult) => {
          this.product = apiResult.result;
        });
    });
  }

  addShoppingCart() {
    const username = localStorage.getItem(LocalStorageKeyConst.username) ?? '';

    const param: AddShoppingCartReq = {
      username: username,
      productId: this.id,
      amount: this.amount,
    };

    this.http
      .post<ApiResult<boolean>>('shopping/addShoppingCart', param)
      .subscribe((apiResult) => {
        const isSuccess = apiResult.result;
        if (isSuccess) {
          this.messageService.add({
            severity: 'success',
            summary: '商品已加入購物車',
          });
        }
      });
  }
}
