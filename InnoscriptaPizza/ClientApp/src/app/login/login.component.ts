import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderDetails } from '../order-deails/order-details.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  //public forecasts: WeatherForecast[];
  public orderDetails: OrderDetails[] = [];
  public userName: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.baseUrl += "api/";
  }

  onLogin() {

    this.http.get<OrderDetails[]>(this.baseUrl + 'OrderDetails/' + this.userName.toLowerCase()).subscribe(result => {
      this.orderDetails = result;
    }, error => console.error(error));
  }
}
