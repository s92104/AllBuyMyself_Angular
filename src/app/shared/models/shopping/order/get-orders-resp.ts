import { OrderItem } from './order-item';

export interface GetOrdersResp {
  id: string;
  items: OrderItem[];
  time: string;
  totalPrice: number;
}
