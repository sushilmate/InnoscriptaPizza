import { Component, OnInit } from '@angular/core';
import { PizzaDetails } from './shared/pizza-details.model';
import { CartService } from '../order-deails/shared/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public Pizzas: PizzaDetails[] = [];

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    const pizza = new PizzaDetails();
    pizza.id = 1;
    pizza.name = "Chilli Salami";
    pizza.type = "Non-Veg";
    pizza.description = "Lunch pizza with chilli salami 2,3 and shepherd's cheese. For additives, see below.";
    pizza.imageUrl = "assets/images/1.jpg";
    pizza.priceInEuro = 2.5;
    pizza.quantity = 1;
    this.Pizzas.push(pizza);

    const pizza1 = new PizzaDetails();
    pizza1.id = 2;
    pizza1.name = "Chilli Paneer";
    pizza1.type = "Veg";
    pizza1.description = "Lunch pizza with chilli salami 2,3 and shepherd's cheese. For additives, see below.";
    pizza1.imageUrl = "assets/images/1.jpg";
    pizza1.priceInEuro = 4.5;
    pizza1.quantity = 1;
    this.Pizzas.push(pizza1);
  }

  onSubmit(pizzaData: PizzaDetails) {

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

  onRemove(pizzaData) {

    const pizzaCartDetails = localStorage.getItem("pizza-details");

    if (pizzaCartDetails !== null) {
      const parsedPizzaDetails: PizzaDetails[] = JSON.parse(pizzaCartDetails);
      const pizzaToUpdate = parsedPizzaDetails.find(x => x.id === pizzaData.id);
      if (pizzaToUpdate !== null && pizzaToUpdate) {
        const pizzaCount = pizzaData.quantity - pizzaToUpdate.quantity;
        pizzaToUpdate.quantity = pizzaCount > 0 ? pizzaCount : 0;
        localStorage.setItem("pizza-details", JSON.stringify(parsedPizzaDetails));
        this.cartService.decrementCartItemsLength(pizzaToUpdate.quantity);
      }
    }
  }
}
