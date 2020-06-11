import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  //public forecasts: WeatherForecast[];
  public orderDetails: OrderHistory[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    //http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
    //  this.forecasts = result;
    //}, error => console.error(error));
  }

  onLogin() {
    alert("User Logged in Successfully.");

    const order = new OrderHistory();
    order.date = "12-Jan-2020";
    order.pizzaName = "Pepe Paneer";
    order.quantity = 2;
    order.amount = 50;
    order.status = "Delievered"

    this.orderDetails.push(order);


    const order1 = new OrderHistory();
    order1.date = "17-Feb-2020";
    order1.pizzaName = "Chicken Masala";
    order1.quantity = 4;
    order1.amount = 120;
    order1.status = "Delievered"

    this.orderDetails.push(order1);
  }
}

export class OrderHistory {
  date: string;
  pizzaName: string;
  quantity: number;
  amount: number;
  status: string;
}
