import { CartLine } from './../../interfaces/cart-item';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {CartComponent} from 'src/app/components/cart/cart.component';

@Component({
  selector: 'app-cart-line',
  templateUrl: './cart-line.component.html',
  styleUrls: ['./cart-line.component.css']
})
export class CartLineComponent implements OnInit {

  constructor() { }

  @Input() cartLine: CartLine = {} as CartLine;
  @Input() index:number = -1;
  @Output() addItemEmmitter = new EventEmitter<number>();
  @Output() removeItemEmmitter = new EventEmitter<number>();
  @Output() deleteEmmitter = new EventEmitter<number>();

  ngOnInit(): void {
  }

  addItem(){
    this.addItemEmmitter.emit(this.index);
  }

  removeItem(){
    this.removeItemEmmitter.emit(this.index);
  }

  delete(){
    this.deleteEmmitter.emit(this.index);
  }
}
