import { GetProductInfoResp } from './get-product-info-resp';

export interface BuyProduct {
  productInfo: GetProductInfoResp | null;
  amount: number;
}
