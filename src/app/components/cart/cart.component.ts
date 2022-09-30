import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import {CartLine} from 'src/app/interfaces/cart-item'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  CartLines: Array<CartLine> = [];
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.CartLines=this.cartService.getProducts();
  }

  addItem(index: number){
    return this.cartService.addProduct(this.cartService.getProducts()[index].product);
  }

  removeItem(index: number){
    return this.cartService.removeProduct(this.cartService.getProducts()[index].product);
  }

  delete(index: number){
    return this.cartService.removeLine(index);
  }

  getCount(cartLine: CartLine){
    return cartLine.count;
  }

  getLineTotal(cartLine: CartLine){
    return cartLine.product.price * cartLine.count
  }

  getSubTotal(){
    return this.cartService.getSubTotal();
  }

  getShipping(){
    return this.cartService.getShipping();
  }

  getTotal(){
    return this.cartService.getTotal();
  }
}
