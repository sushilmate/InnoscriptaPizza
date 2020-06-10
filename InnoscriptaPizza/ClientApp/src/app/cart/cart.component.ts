import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-component',
  templateUrl: './cart.component.html'
})
export class CartComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
