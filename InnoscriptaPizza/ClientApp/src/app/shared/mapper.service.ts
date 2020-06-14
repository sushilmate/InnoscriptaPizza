import { Injectable } from '@angular/core';
import { OrderDetails } from '../order-deails/shared/order-details.model';
import { CustomerOrderDetails } from '../order-deails/shared/customer-order-details.order';
import { PizzaOrderDetails } from '../order-deails/shared/pizza-order-details.model';
import { PizzaDetails } from '../menu/shared/pizza-details.model';

@Injectable({
  providedIn: 'root',
})
export class MapperService {

  mapOrderDetails(allCustomerOrders: CustomerOrderDetails, userName: string): OrderDetails {

    const orderDescription = allCustomerOrders.orderDetails.map(x => x.description).join(', ');

    const order = new OrderDetails();
    order.amountPaid = allCustomerOrders.finalTotal;
    order.date = new Date();
    order.orderDescription = orderDescription;
    order.userName = userName.toLowerCase();
    order.status = "Delievered";

    return order;
  }

  mapPizzaOrder(parsedPizzaDetails: PizzaDetails): PizzaOrderDetails {
    const pizzaOrder = new PizzaOrderDetails();
    pizzaOrder.description = parsedPizzaDetails.quantity + ' X ' + parsedPizzaDetails.name;
    pizzaOrder.amount = parsedPizzaDetails.priceInEur * parsedPizzaDetails.quantity;
    pizzaOrder.id = parsedPizzaDetails.id;
    pizzaOrder.quantity = 1;
    return pizzaOrder;
  }
}
