import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { RegisterReq } from '../../shared/models/authentication/register-req';
import { ApiResult } from '../../shared/models/common/api-result';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CardModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    ConfirmDialogModule,
    LogoComponent,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [ConfirmationService],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  cellphone: string = '';
  email: string = '';
  address: string = '';
  isAccountExist: boolean = false;

  constructor(
    private http: HttpClient,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  register() {
    const param: RegisterReq = {
      username: this.username,
      password: this.password,
      cellphone: this.cellphone,
      email: this.email,
      address: this.address,
    };

    this.http
      .post<ApiResult<boolean>>('Authentication/Register', param)
      .subscribe((apiResult) => {
        const isSuccess = apiResult.result;
        this.isAccountExist = !isSuccess;

        if (isSuccess) {
          this.confirm();
        }
      });
  }

  confirm() {
    this.confirmationService.confirm({
      header: '註冊成功',
      accept: () => {
        this.router.navigateByUrl('authentication/login');
      },
    });
  }
}
