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
      this.AllCustomerOrders.grandTotal += parsedPizzaDetails[i].priceInEuro * parsedPizzaDetails[i].quantity;
      this.AllCustomerOrders.orderDetails.push(parsedPizzaDetails[i]);
    }

    const discountedTotal = this.AllCustomerOrders.grandTotal - this.AllCustomerOrders.discount;
    this.AllCustomerOrders.finalTotal = discountedTotal + this.AllCustomerOrders.delieveryCharges;
  }

  onAddOrder(pizzaData) {
    const pizzaCartDetails = localStorage.getItem("pizza-details");

    if (pizzaCartDetails !== null) {
      const parsedPizzaDetails: PizzaDetails[] = JSON.parse(pizzaCartDetails);
      const pizzaToUpdate = parsedPizzaDetails.find(x => x.id === pizzaData.id);
      if (pizzaToUpdate !== null && pizzaToUpdate) {
        pizzaToUpdate.quantity = pizzaData.quantity + pizzaToUpdate.quantity;
        localStorage.setItem("pizza-details", JSON.stringify(parsedPizzaDetails));
      }
      else {
        parsedPizzaDetails.push(pizzaData);
        localStorage.setItem("pizza-details", JSON.stringify(parsedPizzaDetails));
      }
    }
    else {
      const pizzaInCache: PizzaDetails[] = [];
      pizzaInCache.push(pizzaData);

      localStorage.setItem("pizza-details", JSON.stringify(pizzaInCache));
    }

    this.cartService.incrementCartItemsLength(pizzaData.quantity);
  }

  onRemoveOrder(pizzaData) {
    const pizzaCartDetails = localStorage.getItem("pizza-details");

    if (pizzaCartDetails !== null) {
      const parsedPizzaDetails: PizzaDetails[] = JSON.parse(pizzaCartDetails);
      const pizzaToUpdate = parsedPizzaDetails.find(x => x.id === pizzaData.id);
      if (pizzaToUpdate !== null && pizzaToUpdate) {
        const pizzaCount = pizzaToUpdate.quantity - pizzaData.quantity;
        pizzaToUpdate.quantity = pizzaCount > 0 ? pizzaCount : 0;
        localStorage.setItem("pizza-details", JSON.stringify(parsedPizzaDetails));
        this.cartService.decrementCartItemsLength(pizzaData.quantity);
      }
    }
  }

  onConfirm() {
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
  orderDetails: PizzaDetails[] = [];
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

//export class PizzaOrderDetails {
//  orderId: number;
//  pizzaName: string;
//  totalPriceInEuro: number;
//  totalPriceInUsd: number;
//  quantity: number;
//}
