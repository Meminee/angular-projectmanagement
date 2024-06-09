import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { Product } from 'src/app/models/product.';
import { ProductService } from 'src/app/services/product.service';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products?: Product[];
  currentProduct?: Product;
  currentIndex = -1;
  nom: string = ''; // Assign a type to nom and provide an initial value
  url=this.currentProduct?._links?.self?.href;
  
  fromChild=""

  constructor(private productService: ProductService ,private sharedService :SharedService) {}

  ngOnInit(): void {
    
    this.retrieveProducts();
  }
 
  retrieveProducts(): void {
    this.productService.getAll().subscribe(
      (data: any) => {
        // Assuming data is an object with _embedded property
        if (data._embedded && data._embedded.products) {
          // Extract products from _embedded
          this.products = data._embedded.products;
        } else {
          // Fallback in case the structure is different
          this.products = [];
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }


  refreshList(): void {
    this.retrieveProducts();
    this.currentProduct = undefined;
    this.currentIndex = -1;
  }

  saveActiveProduct(product:Product,index:number):void{
    this.currentProduct=product;
    console.log(index);
    this.sharedService.setCurrentProduct(this.currentProduct)
    this.currentIndex=index;
    this.url=this.currentProduct._links?.self?.href;
  }

  searchNom():void{
    this.productService.findByNum(this.nom).subscribe((data:any)=>{

      if (data._embedded && data._embedded.products) {
        // Extract products from _embedded
        this.products = data._embedded.products;
      } else {
        // Fallback in case the structure is different
        this.products = [];
      }
      
    },
      error=>{
        console.error(error);
      });
  }

  removeAllProducts():void {
    this.productService.deleteAll().subscribe(response=>{
      console.log(response);
      this.refreshList();
    },
    error=>{
      console.error(error);
    })
  }



}
