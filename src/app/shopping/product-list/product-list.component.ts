import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { ApiResult } from '../../shared/models/common/api-result';
import { LocalStorageKeyConst } from '../../shared/models/common/const/local-storage-key-const';
import { GetProductListResp } from '../../shared/models/shopping/get-product-list-resp';
import { ChangeSaveReq } from '../../shared/models/shopping/save/change-save-req';

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
  username: string = localStorage.getItem(LocalStorageKeyConst.username) ?? '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<ApiResult<GetProductListResp[]>>('shopping/getProductList', {
        params: {
          username: this.username,
        },
      })
      .subscribe((apiresult) => {
        this.products = apiresult.result ?? [];
      });
  }

  changeSave(item: GetProductListResp) {
    const param: ChangeSaveReq = {
      username: this.username,
      productId: item.id,
    };

    this.http
      .post<ApiResult<boolean>>('save/changeSave', param)
      .subscribe((apiResult) => {
        const isSuccess = apiResult.result;
        if (isSuccess) {
          location.reload();
        }
      });
  }
}
