import { Injectable, OnDestroy } from '@angular/core';
import { PizzaDetails } from '../menu/shared/pizza-details.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService implements OnDestroy {

  getPizzaDetails(): PizzaDetails[] {
    const pizzaDetails = localStorage.getItem("pizza-details");
    if (pizzaDetails !== null) {
      const parsedPizzaDetails: PizzaDetails[] = JSON.parse(pizzaDetails);
      return parsedPizzaDetails;
    }
    return null;
  }

  setPizzaDetails(pizzaDetails: PizzaDetails[]): void {
    localStorage.setItem("pizza-details", JSON.stringify(pizzaDetails));
  }

  removePizzaDetails(): void {
    localStorage.removeItem("pizza-details");
  }

  ngOnDestroy() {
    localStorage.clear();
  }
}
