import { Injectable } from '@angular/core';
import { CartLine } from '../interfaces/cart-item';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartLines: Array<CartLine> = [];
  constructor() {}

  getProducts(): Array<CartLine>{
    this.cartLines = JSON.parse(localStorage.getItem('cartLines') || '[]');
    return this.cartLines;
  }

  getProductCount(): number {
    return this.cartLines.length;
  }

  addProduct(product: Product) {
    let itemFound = false;
    for (let i = 0; i < this.cartLines.length; i++) {
      if (this.cartLines[i].product.id === product.id) {
        this.cartLines[i].count += 1;
        itemFound = true;
      }
    }
    if (!itemFound) {
      this.cartLines.push(new CartLine(product));
    }
    localStorage.setItem('cartLines', JSON.stringify(this.cartLines));
    if(itemFound) window.location.reload();
  }

  //Implement function removeProduct
  removeProduct(product: Product) {
    for (let i = 0; i < this.cartLines.length; i++) {
      if (this.cartLines[i].product.id === product.id) {
        this.cartLines[i].count -= 1;
        if(this.cartLines[i].count==0){
          this.removeLine(i);
          return;
        }
      }
    }
    localStorage.setItem('cartLines', JSON.stringify(this.cartLines));
    window.location.reload();
  }
  //Implement function removeLine
  removeLine(index: number) {
    this.cartLines.splice(index,1);
    localStorage.setItem('cartLines', JSON.stringify(this.cartLines));
    window.location.reload();
  }

  getSubTotal(){
    return this.cartLines.map((l) => l.product.price * l.count).reduce((a, v) => (a += v));
  }

  getShipping(){
    return 10 * this.cartLines.length;
  }

  getTotal(){
    return this.getSubTotal() + this.getShipping();
  }
}
