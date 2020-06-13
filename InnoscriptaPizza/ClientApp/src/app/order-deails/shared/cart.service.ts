import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

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

  constructor() { }

  incrementCartItemsLength(newItemsLength: number) {
    this.cartItemsLengthIncremented.next(newItemsLength);
  }

  decrementCartItemsLength(itemsLengthRemove: number) {
    this.cartItemsLengthDecremented.next(itemsLengthRemove);
  }

  removeCartItems() {
    this.cartItemsRemove.next();
  }

  ngOnDestroy(): void {
    this.cartItemsLengthDecremented.unsubscribe();
    this.cartItemsLengthIncremented.unsubscribe();
    this.cartItemsRemove.unsubscribe();
  }
}
