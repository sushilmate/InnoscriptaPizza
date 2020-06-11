import { Component, OnInit } from '@angular/core';
import { PizzaDetails } from '../menu/shared/pizza-details.model';
import { CartService } from './shared/cart.service';

@Component({
  selector: 'app-order-details-component',
  templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit {

  AllCustomerOrders: CustomerOrderDetails;

  constructor(private cartService: CartService) {

    this.AllCustomerOrders = new CustomerOrderDetails();

  }
    ngOnInit(): void {

      const parsedPizzaDetails: PizzaDetails[] = JSON.parse(localStorage.getItem("pizza-details"));

      if (parsedPizzaDetails === null)
        return;

      for (let i = 0; i < parsedPizzaDetails.length; i++) {

        const pizzaOrder = new PizzaOrderDetails();
        pizzaOrder.orderId = parsedPizzaDetails[i].id;
        pizzaOrder.pizzaName = parsedPizzaDetails[i].name;
        pizzaOrder.totalPriceInEuro = parsedPizzaDetails[i].priceInEuro * parsedPizzaDetails[i].quantity;
        pizzaOrder.totalPriceInUsd = pizzaOrder.totalPriceInEuro * 1.13; // static conversion multiplier
        pizzaOrder.quantity = parsedPizzaDetails[i].quantity;
        this.AllCustomerOrders.grandTotal = this.AllCustomerOrders.grandTotal + pizzaOrder.totalPriceInEuro;
        this.AllCustomerOrders.orderDetails.push(pizzaOrder);
      }
      const discountedTotal = this.AllCustomerOrders.grandTotal - this.AllCustomerOrders.discount;
      this.AllCustomerOrders.finalTotal = discountedTotal + this.AllCustomerOrders.delieveryCharges;
    }

  onConfirm(event) {
    alert("Thank you for ordering with us, your pizza will be delievered shortly.");
    localStorage.removeItem("pizza-details");
    this.cartService.removeCartItems();
    this.AllCustomerOrders = new CustomerOrderDetails();
  }
  onCancel() {
    localStorage.removeItem("pizza-details");
    this.cartService.removeCartItems();
    this.AllCustomerOrders = new CustomerOrderDetails();
  }
}

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

export class PizzaOrderDetails {
  orderId: number;
  pizzaName: string;
  totalPriceInEuro: number;
  totalPriceInUsd: number;
  quantity: number;
}
