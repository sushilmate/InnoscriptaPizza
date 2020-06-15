import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../order-deails/shared/cart.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  cartCounter: number;

  constructor(private cartService: CartService, private toastrService: ToastrService) {
    this.cartCounter = 0;

    this.cartService.incrementCartItemsLength$.subscribe(
      counter => {
        this.cartCounter = this.cartCounter + counter;
        this.toastrService.success("Pizza added to the cart.", "",
          {
            timeOut: 1500
          });
      });

    this.cartService.decrementCartItemsLength$.subscribe(
      counter => {
        const counterVal = counter;
        if (counterVal >= 0) {
          this.toastrService.error("Pizza removed from the cart.", "", {
            timeOut: 1500
          });
          this.cartCounter = counterVal;
        }
        else {
          this.cartCounter = 0;
        }
      });

    this.cartService.removeCartItems$.subscribe(
      () => {
        this.cartCounter = 0;
      });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
