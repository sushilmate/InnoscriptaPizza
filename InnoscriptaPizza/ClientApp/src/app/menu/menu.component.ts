import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";

import { CartService } from '../order-deails/shared/cart.service';
import { PizzaDetails } from './shared/pizza-details.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public Pizzas: PizzaDetails[] = [];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private cartService: CartService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.http.get<PizzaDetails[]>(this.baseUrl + 'pizza').subscribe(result => {
      this.Pizzas = result;
    }, error => console.error(error));
  }

  onAddPizza(pizzaData: PizzaDetails) {
    this.cartService.AddPizzaToTheCart(pizzaData);    
  }

  onRemovePizza(pizzaData: PizzaDetails) {
    this.cartService.RemovePizzaFromTheCart(pizzaData);
  }
}
