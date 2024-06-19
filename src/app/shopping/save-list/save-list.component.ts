import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { ApiResult } from '../../shared/models/common/api-result';
import { LocalStorageKeyConst } from '../../shared/models/common/const/local-storage-key-const';
import { ChangeSaveReq } from '../../shared/models/shopping/save/change-save-req';
import { GetSavesResp } from '../../shared/models/shopping/save/get-saves-resp';

@Component({
  selector: 'app-save-list',
  standalone: true,
  imports: [DataViewModule, CommonModule, ButtonModule, RouterModule],
  templateUrl: './save-list.component.html',
  styleUrl: './save-list.component.css',
})
export class SaveListComponent implements OnInit {
  products: GetSavesResp[] = [];
  username: string = localStorage.getItem(LocalStorageKeyConst.username) ?? '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<ApiResult<GetSavesResp[]>>('save/getSaves', {
        params: { username: this.username },
      })
      .subscribe((apiResult) => {
        this.products = apiResult.result ?? [];
      });
  }

  changeSave(item: GetSavesResp) {
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
