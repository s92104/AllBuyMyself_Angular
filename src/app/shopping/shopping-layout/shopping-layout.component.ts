import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { ToolbarModule } from 'primeng/toolbar';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { LocalStorageKeyConst } from '../../shared/models/common/const/local-storage-key-const';

@Component({
  selector: 'app-shopping-layout',
  standalone: true,
  imports: [
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    LogoComponent,
    CardModule,
    RouterModule,
    DividerModule,
    MenuModule,
  ],
  templateUrl: './shopping-layout.component.html',
  styleUrl: './shopping-layout.component.css',
})
export class ShoppingLayoutComponent implements OnInit {
  username: string | null = null;
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem(LocalStorageKeyConst.username);

    this.items = [
      {
        label: this.username ?? '',
        items: [
          {
            label: '我的帳號',
            icon: 'pi pi-user',
            route: '/shopping/account',
          },
          {
            label: '購物車',
            icon: 'pi pi-shopping-cart',
            route: '/shopping/shopping-cart',
          },
          {
            label: '我的訂單',
            icon: 'pi pi-clipboard',
            route: '/shopping/order',
          },
          {
            label: '收藏清單',
            icon: 'pi pi-bookmark',
            route: '/shopping/save-list',
          },
        ],
      },
    ];
  }

  logout() {
    localStorage.clear();
    location.reload();
  }
}
