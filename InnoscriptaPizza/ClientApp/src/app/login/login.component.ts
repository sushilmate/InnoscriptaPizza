import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderDetails } from '../order-deails/shared/order-details.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //public forecasts: WeatherForecast[];
  public orderDetails: OrderDetails[] = [];
  public userName: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private spinner: NgxSpinnerService) {
  }

  onLogin() {
    this.spinner.show();
    this.http.get<OrderDetails[]>(this.baseUrl + 'OrderDetails/' + this.userName.toLowerCase()).subscribe(result => {
      this.orderDetails = result;
    }, error => console.error(error), () => { this.spinner.hide() });
  }
}
