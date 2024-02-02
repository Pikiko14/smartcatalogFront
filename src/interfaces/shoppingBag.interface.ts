import { PricesInterface } from './product.interface';

export interface ShoppingBagInterface {
  attribute: string;
  price: number;
  pricesList: PricesInterface[];
  quantity: number;
  reference: string;
  tax: number;
  name: string;
  img: string;
  total?: number;
  taxTotal?: number | string;
}
