import { Component, OnInit } from '@angular/core';
import { PizzaDetails } from './shared/pizza-details.model';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../cart/shared/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public Pizzas: PizzaDetails[] = [];
  checkoutForm;

  constructor(private formBuilder: FormBuilder, private cartService: CartService) {
    this.checkoutForm = this.formBuilder.group({
      id: '1',
      number: '1'
    });



  }

  ngOnInit() {
    const pizza = new PizzaDetails();
    pizza.id = 1;
    pizza.name = "Chilli Salami";
    pizza.type = "Non-Veg";
    pizza.description = "Lunch pizza with chilli salami 2,3 and shepherd's cheese. For additives, see below.";
    pizza.imageUrl = "assets/images/1.jpg";
    pizza.priceInEuro = 2.5;
    this.Pizzas.push(pizza);

    const pizza1 = new PizzaDetails();
    pizza1.id = 2;
    pizza1.name = "Chilli Paneer";
    pizza1.type = "Veg";
    pizza1.description = "Lunch pizza with chilli salami 2,3 and shepherd's cheese. For additives, see below.";
    pizza1.imageUrl = "assets/images/1.jpg";
    pizza1.priceInEuro = 4.5;
    this.Pizzas.push(pizza1);
  }

  onSubmit(pizzaData, number) {
    this.cartService.incrementCartItemsLength(2);
  }
}
