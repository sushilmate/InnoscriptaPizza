import { Component, OnInit, Inject } from '@angular/core';

import { PizzaDetails } from './shared/pizza-details.model';
import { CartService } from '../order-deails/shared/cart.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public Pizzas: PizzaDetails[] = [];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private cartService: CartService) {
  }

  ngOnInit() {
    this.http.get<PizzaDetails[]>(this.baseUrl + 'pizza').subscribe(result => {
      this.Pizzas = result;
    }, error => console.error(error));
  }

  onSubmit(pizzaData: PizzaDetails) {

    const pizzaCartDetails = localStorage.getItem("pizza-details");

    if (pizzaCartDetails !== null) {
      const parsedPizzaDetails: PizzaDetails[] = JSON.parse(pizzaCartDetails);
      const pizzaToUpdate = parsedPizzaDetails.find(x => x.id === pizzaData.id);
      if (pizzaToUpdate !== null && pizzaToUpdate) {
        pizzaToUpdate.quantity += pizzaToUpdate.quantity;
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

  onRemove(pizzaData) {

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
}
