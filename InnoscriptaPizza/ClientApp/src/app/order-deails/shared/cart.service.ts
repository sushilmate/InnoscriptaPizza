import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { PizzaDetails } from '../../menu/shared/pizza-details.model';
import { StorageService } from '../../shared/storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnDestroy {

  // Observable string sources
  private cartItemsLengthIncremented = new Subject<number>();
  private cartItemsLengthDecremented = new Subject<number>();
  private cartItemsRemove = new Subject();

  incrementCartItemsLength$ = this.cartItemsLengthIncremented.asObservable();
  decrementCartItemsLength$ = this.cartItemsLengthDecremented.asObservable();
  removeCartItems$ = this.cartItemsRemove.asObservable();

  constructor(private storage: StorageService) { }

  incrementCartItemsLength(newItemsLength: number) {
    this.cartItemsLengthIncremented.next(newItemsLength);
  }

  decrementCartItemsLength(itemsLengthRemove: number) {
    this.cartItemsLengthDecremented.next(itemsLengthRemove);
  }

  removeCartItems() {
    this.cartItemsRemove.next();
  }

  AddPizzaToTheCart(pizzaData: PizzaDetails): void {
    const parsedPizzaDetails = this.storage.getPizzaDetails();

    if (parsedPizzaDetails !== null) {
      const pizzaToUpdate = parsedPizzaDetails.find(x => x.id === pizzaData.id);
      if (pizzaToUpdate !== null && pizzaToUpdate) {
        pizzaToUpdate.quantity += pizzaToUpdate.quantity;
        this.storage.setPizzaDetails(parsedPizzaDetails);
      }
      else {
        parsedPizzaDetails.push(pizzaData);
        this.storage.setPizzaDetails(parsedPizzaDetails);
      }
    }
    else {
      const pizzaInCache: PizzaDetails[] = [];
      pizzaInCache.push(pizzaData);

      this.storage.setPizzaDetails(pizzaInCache);
    }

    this.incrementCartItemsLength(pizzaData.quantity);
  }

  RemovePizzaFromTheCart(pizzaData: PizzaDetails) {
    let parsedPizzaDetails = this.storage.getPizzaDetails();

    if (parsedPizzaDetails !== null) {
      const pizzaToUpdate = parsedPizzaDetails.find(x => x.id === pizzaData.id);
      if (pizzaToUpdate !== null && pizzaToUpdate) {
        const pizzaCount = pizzaToUpdate.quantity - pizzaData.quantity;
        pizzaToUpdate.quantity = pizzaCount > 0 ? pizzaCount : 0;
        if (pizzaToUpdate.quantity <= 0) {
          parsedPizzaDetails = parsedPizzaDetails.filter(x => x !== pizzaToUpdate);
        }
        this.storage.setPizzaDetails(parsedPizzaDetails);
        this.decrementCartItemsLength(pizzaData.quantity);
      }
    }
  }

  ngOnDestroy(): void {
    this.cartItemsLengthDecremented.unsubscribe();
    this.cartItemsLengthIncremented.unsubscribe();
    this.cartItemsRemove.unsubscribe();
  }
}
