import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { LoginReq } from '../../shared/models/authentication/login-req';
import { ApiResult } from '../../shared/models/common/api-result';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CardModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    LogoComponent,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isIncorrect: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const param: LoginReq = {
      username: this.username,
      password: this.password,
    };

    this.http
      .post<ApiResult<boolean>>('Authentication/Login', param)
      .subscribe((apiResult) => {
        const isSuccess = apiResult.result;
        this.isIncorrect = !isSuccess;

        if (isSuccess) {
          localStorage.setItem('username', this.username);
          this.router.navigateByUrl('shopping');
        }
      });
  }
}
