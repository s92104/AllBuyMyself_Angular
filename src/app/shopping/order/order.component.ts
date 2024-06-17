import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { ApiResult } from '../../shared/models/common/api-result';
import { LocalStorageKeyConst } from '../../shared/models/common/const/local-storage-key-const';
import { GetOrdersResp } from '../../shared/models/shopping/order/get-orders-resp';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    DataViewModule,
    CommonModule,
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  username: string = localStorage.getItem(LocalStorageKeyConst.username) ?? '';
  orders: GetOrdersResp[] = [];

  constructor(
    private http: HttpClient,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.http
      .get<ApiResult<GetOrdersResp[]>>('order/getOrders', {
        params: {
          username: this.username,
        },
      })
      .subscribe((apiResult) => {
        this.orders = apiResult.result ?? [];
      });
  }

  cancelOrder(event: Event, order: GetOrdersResp) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      header: '取消訂單確認',
      message: '你確定要取消這筆訂單嗎?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.http
          .delete<ApiResult<boolean>>('order/deleteOrder', {
            params: {
              username: this.username,
              id: order.id,
            },
          })
          .subscribe((apiResult) => {
            const isSuccess = apiResult.result;
            if (isSuccess) {
              location.reload();
            }
          });
      },
      reject: () => {},
    });
  }
}
