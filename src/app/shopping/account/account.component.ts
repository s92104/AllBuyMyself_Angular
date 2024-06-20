import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { ApiResult } from '../../shared/models/common/api-result';
import { LocalStorageKeyConst } from '../../shared/models/common/const/local-storage-key-const';
import { GetAccountResp } from '../../shared/models/shopping/account/get-account-resp';
import { ModifyAccountReq } from '../../shared/models/shopping/account/modify-account-req';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    LogoComponent,
    CardModule,
    FloatLabelModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    InputTextModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  username: string = localStorage.getItem(LocalStorageKeyConst.username) ?? '';
  password: string = '';
  cellphone: string | null = null;
  email: string | null = null;
  address: string | null = null;

  constructor(
    private http: HttpClient,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.http
      .get<ApiResult<GetAccountResp>>('account/getAccount', {
        params: {
          username: this.username,
        },
      })
      .subscribe((apiResult) => {
        const account = apiResult.result;
        if (!account) {
          return;
        }

        this.password = account?.password;
        this.cellphone = account?.cellphone;
        this.email = account?.email;
        this.address = account?.address;
      });
  }

  modify() {
    const param: ModifyAccountReq = {
      username: this.username,
      password: this.password,
      cellphone: this.cellphone,
      email: this.email,
      address: this.address,
    };

    this.http
      .put<ApiResult<boolean>>('account/modifyAccount', param)
      .subscribe((apiResult) => {
        const isSuccess = apiResult.result;
        if (isSuccess) {
          this.confirm();
        }
      });
  }

  confirm() {
    this.confirmationService.confirm({
      header: '修改成功',
      accept: () => {},
    });
  }
}
