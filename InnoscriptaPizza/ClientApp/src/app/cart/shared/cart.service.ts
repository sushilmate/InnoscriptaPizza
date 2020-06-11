import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Observable string sources
  private cartItemsLengthIncremented = new Subject<number>();

  incrementCartItemsLength$ = this.cartItemsLengthIncremented.asObservable();

  constructor() { }

  incrementCartItemsLength(newItemsLength: number) {

    this.cartItemsLengthIncremented.next(newItemsLength);

  }
}
