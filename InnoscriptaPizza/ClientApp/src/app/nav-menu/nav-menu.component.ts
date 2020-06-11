import { Component } from '@angular/core';
import { CartService } from '../cart/shared/cart.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  cartCounter: number;

  constructor(private cartService: CartService) {
    this.cartCounter = 0;

    this.cartService.incrementCartItemsLength$.subscribe(
      counter => {
        this.cartCounter = this.cartCounter + counter;
      });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
