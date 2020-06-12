export class PizzaDetails {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  type: string;
  priceInEuro: number;
  quantity: number;
  constructor() {
    this.quantity = 0;
  }
}
