import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { LocalStorageKeyConst } from '../../shared/models/common/const/local-storage-key-const';
import { BuyProduct } from '../../shared/models/shopping/buy-product';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    DataViewModule,
    CommonModule,
    ButtonModule,
    CardModule,
    DividerModule,
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent implements OnInit {
  products: BuyProduct[] = [];
  total: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const shoppingCartJson = localStorage.getItem(
      LocalStorageKeyConst.shoppingCart
    );
    if (shoppingCartJson) {
      this.products = JSON.parse(shoppingCartJson);

      this.products.forEach((product) => {
        this.total += (product.productInfo?.price ?? 0) * product.amount;
      });
    }
  }

  checkout() {
    localStorage.removeItem(LocalStorageKeyConst.shoppingCart);
    this.router.navigateByUrl('');
  }
}
