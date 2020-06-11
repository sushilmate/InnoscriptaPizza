import { Component, OnInit } from '@angular/core';
import { PizzaDetails } from './shared/pizza-details.model';
import { CartService } from '../cart/shared/cart.service';

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
    const pizzaKey = pizzaData.id.toString();
    const pizzaCartDetails = localStorage.getItem(pizzaKey);

    if (pizzaCartDetails !== null) {
      const parsedPizzaDetails = JSON.parse(pizzaCartDetails);
      parsedPizzaDetails.quantity = pizzaData.quantity + parsedPizzaDetails.quantity;
      localStorage.setItem(pizzaKey, JSON.stringify(parsedPizzaDetails));
    }
    else {
      localStorage.setItem(pizzaKey, JSON.stringify(pizzaData));
    }

    this.cartService.incrementCartItemsLength(pizzaData.quantity);
  }
}
