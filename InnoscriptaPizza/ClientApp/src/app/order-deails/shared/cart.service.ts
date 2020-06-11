import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Observable string sources
  private cartItemsLengthIncremented = new Subject<number>();
  private cartItemsRemove = new Subject();

  incrementCartItemsLength$ = this.cartItemsLengthIncremented.asObservable();
  removeCartItems$ = this.cartItemsRemove.asObservable();

  constructor() { }

  incrementCartItemsLength(newItemsLength: number) {

    this.cartItemsLengthIncremented.next(newItemsLength);

  }

  removeCartItems() {
    this.cartItemsRemove.next();
  }
}
