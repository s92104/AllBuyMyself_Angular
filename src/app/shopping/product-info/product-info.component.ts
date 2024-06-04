import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ApiResult } from '../../shared/models/common/api-result';
import { LocalStorageKeyConst } from '../../shared/models/common/const/local-storage-key-const';
import { BuyProduct } from '../../shared/models/shopping/buy-product';
import { GetProductInfoResp } from '../../shared/models/shopping/get-product-info-resp';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CardModule, ButtonModule, InputTextModule, FormsModule],
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
    private router: Router
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
    const buyProduct: BuyProduct = {
      productInfo: this.product,
      amount: this.amount,
    };

    const shoppingCartJson = localStorage.getItem(
      LocalStorageKeyConst.shoppingCart
    );

    if (!shoppingCartJson) {
      localStorage.setItem(
        LocalStorageKeyConst.shoppingCart,
        JSON.stringify([buyProduct])
      );
    } else {
      let shoppingCart: BuyProduct[] = JSON.parse(shoppingCartJson);
      shoppingCart = [...shoppingCart, buyProduct];
      localStorage.setItem(
        LocalStorageKeyConst.shoppingCart,
        JSON.stringify(shoppingCart)
      );
    }

    this.router.navigateByUrl('');
  }
}
