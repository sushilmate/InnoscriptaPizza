import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderDetails } from '../order-deails/shared/order-details.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

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
    private spinner: NgxSpinnerService, private toastrService: ToastrService) {
    this.userName = '';
  }

  onLogin() {
    this.spinner.show();
    this.http.get<OrderDetails[]>(this.baseUrl + 'OrderDetails/' + this.userName.toLowerCase()).subscribe(result => {
      this.orderDetails = result;
      if (this.orderDetails.length === 0)
        this.toastrService.error("No order history found under user: " + this.userName, "", {
          timeOut: 2000
        });
    }, error => {
        console.error(error);
        alert(error);
    }, () => { this.spinner.hide() });
  }
}
