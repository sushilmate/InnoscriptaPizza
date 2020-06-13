import { Component, OnInit, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { PizzaDetails } from '../menu/shared/pizza-details.model';
import { CartService } from './shared/cart.service';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Component({
  selector: 'app-order-details-component',
  templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit {

  AllCustomerOrders: CustomerOrderDetails;
  userName: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private cartService: CartService, private toastrService: ToastrService) {

    this.AllCustomerOrders = new CustomerOrderDetails();
    this.baseUrl += "api/";

  }
  ngOnInit(): void {

    const parsedPizzaDetails: PizzaDetails[] = JSON.parse(localStorage.getItem("pizza-details"));

    if (parsedPizzaDetails === null)
      return;

    for (let i = 0; i < parsedPizzaDetails.length; i++) {
      this.AllCustomerOrders.grandTotal += parsedPizzaDetails[i].priceInEur * parsedPizzaDetails[i].quantity;
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
    const order = this.getOrderDetails();

    this.http.post<boolean>(this.baseUrl + "OrderDetails", order, httpOptions).subscribe(result => {
      if (result) {
        this.toastrService.success("Thank you for ordering with us, your pizza will be delievered shortly.",
          "", { timeOut: 1500 });

        localStorage.removeItem("pizza-details");
        this.cartService.removeCartItems();
        this.AllCustomerOrders = new CustomerOrderDetails();
      }
    }, error => {
      this.toastrService.error("The order could not placed successfully, please re-order the delievery.",
        "", { timeOut: 1500 });
      console.error(error)
    });
  }

  onCancel() {
    localStorage.removeItem("pizza-details");
    this.cartService.removeCartItems();
    this.AllCustomerOrders = new CustomerOrderDetails();
  }

  getOrderDetails(): OrderDetails {

    var orderDescription = this.AllCustomerOrders.orderDetails.map(x => x.quantity + ' X ' + x.name).join('\n');

    const order = new OrderDetails();
    order.amountPaid = this.AllCustomerOrders.finalTotal;
    order.date = new Date();
    order.orderDescription = orderDescription;
    order.userName = this.userName.toLowerCase();
    order.status = "Delievered";

    return order;
  }
}

export class OrderDetails {
  userName: string;
  date: Date;
  orderDescription: string;
  status: string
  amountPaid: number;
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
