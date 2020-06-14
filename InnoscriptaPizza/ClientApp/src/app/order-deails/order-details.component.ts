import { Component, OnInit, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

import { PizzaDetails } from '../menu/shared/pizza-details.model';
import { CartService } from './shared/cart.service';
import { CustomerOrderDetails } from './shared/customer-order-details.order';
import { MapperService } from '../shared/mapper.service';
import { StorageService } from '../shared/storage.service';
import { NgxSpinnerService } from 'ngx-spinner';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Component({
  selector: 'app-order-details-component',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  AllCustomerOrders: CustomerOrderDetails;
  userName: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private cartService: CartService, private toastrService: ToastrService,
    private mapper: MapperService, private storage: StorageService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.calculateCustomerOrder();
  }

  calculateCustomerOrder() {
    this.AllCustomerOrders = new CustomerOrderDetails();

    const parsedPizzaDetails = this.storage.getPizzaDetails();

    if (parsedPizzaDetails === null)
      return;

    for (let i = 0; i < parsedPizzaDetails.length; i++) {
      const pizzaOrder = this.mapper.mapPizzaOrder(parsedPizzaDetails[i]);
      this.AllCustomerOrders.grandTotal += pizzaOrder.amount;
      this.AllCustomerOrders.orderDetails.push(pizzaOrder);
    }

    const discountedTotal = this.AllCustomerOrders.grandTotal - this.AllCustomerOrders.discount;
    this.AllCustomerOrders.finalTotal = discountedTotal + this.AllCustomerOrders.delieveryCharges;
  }

  onAddOrder(pizzaData: PizzaDetails) {
    this.cartService.AddPizzaToTheCart(pizzaData);
    this.calculateCustomerOrder();
  }

  onRemoveOrder(pizzaData: PizzaDetails) {
    this.cartService.RemovePizzaFromTheCart(pizzaData);
    this.calculateCustomerOrder();
  }

  onConfirm() {
    this.spinner.show();
    const order = this.mapper.mapOrderDetails(this.AllCustomerOrders, this.userName);

    this.http.post<boolean>(this.baseUrl + "OrderDetails", order, httpOptions).subscribe(result => {
      if (result) {
        this.toastrService.success("Thank you for ordering with us, your pizza will be delievered shortly.",
          "", { timeOut: 1500 });

        this.storage.removePizzaDetails();
        this.cartService.removeCartItems();
        this.AllCustomerOrders = new CustomerOrderDetails();
      }
    }, error => {
      this.toastrService.error("The order could not placed successfully, please re-order the delievery.",
        "", { timeOut: 1500 });
      console.error(error)
    }, () => { this.spinner.hide() });
  }

  onCancel() {
    this.storage.removePizzaDetails();
    this.cartService.removeCartItems();
    this.AllCustomerOrders = new CustomerOrderDetails();
  }
}
