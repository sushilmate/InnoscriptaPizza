import { PizzaOrderDetails } from "./pizza-order-details.model";

export class CustomerOrderDetails {
  name: string;
  surName: string;
  address: string;
  orderDetails: PizzaOrderDetails[] = [];
  grandTotal: number;
  discount: number;
  delieveryCharges: number;
  finalTotal: number;

  constructor() {
    this.grandTotal = 0;
    this.discount = 0;
    this.delieveryCharges = 10;
    this.finalTotal = 0;
  }
}
