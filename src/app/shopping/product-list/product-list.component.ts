import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { ApiResult } from '../../shared/models/common/api-result';
import { GetProductListResp } from '../../shared/models/shopping/get-product-list-resp';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [DataViewModule, CommonModule, ButtonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  layout: 'list' | 'grid' = 'list';
  products: GetProductListResp[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<ApiResult<GetProductListResp[]>>('shopping/getProductList')
      .subscribe((apiresult) => {
        this.products = apiresult.result ?? [];
      });
  }
}
