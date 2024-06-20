import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AccountComponent } from './shopping/account/account.component';
import { OrderComponent } from './shopping/order/order.component';
import { ProductInfoComponent } from './shopping/product-info/product-info.component';
import { ProductListComponent } from './shopping/product-list/product-list.component';
import { SaveListComponent } from './shopping/save-list/save-list.component';
import { ShoppingCartComponent } from './shopping/shopping-cart/shopping-cart.component';
import { ShoppingLayoutComponent } from './shopping/shopping-layout/shopping-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/shopping', pathMatch: 'full' },
  {
    path: 'authentication',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'shopping',
    component: ShoppingLayoutComponent,
    children: [
      { path: '', redirectTo: 'product-list', pathMatch: 'full' },
      { path: 'product-list', component: ProductListComponent },
      { path: 'product-info/:id', component: ProductInfoComponent },
      { path: 'account', component: AccountComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'order', component: OrderComponent },
      { path: 'save-list', component: SaveListComponent },
    ],
  },
];
