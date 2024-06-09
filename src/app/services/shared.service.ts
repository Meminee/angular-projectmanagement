import { Injectable } from '@angular/core';
import { Product } from '../models/product.';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
 currentProduct ?: Product

  constructor() { }
  setCurrentProduct(product :Product){
    this.currentProduct=product;
  }
  getCurrentProduct() : any{
    return this.currentProduct
  }
}
