import { Component, EventEmitter, Input, OnInit ,Output } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.'; // Remove the extra dot at the end
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


  currentProduct: Product = {
    nom: '',
    description: '',
    prix: 100,
    published: true
  };
  message = '';
  url = this.currentProduct._links?.self?.href;
  
  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,private sharedService :SharedService) {
  
              }
 

  ngOnInit(): void {
    
    this.currentProduct=this.sharedService.getCurrentProduct()
    this.url=this.currentProduct._links?.self?.href;

  }

  getProduct(id: string): void {
    
    this.productService.get(id).subscribe(data => {
      this.currentProduct = data;
    });
  }

  updatePublication(status: boolean): void {
    const data = {
      nom: this.currentProduct.nom,
      description: this.currentProduct.description,
      prix: this.currentProduct.prix,
      published: status
    };
    this.productService.update(this.url, data).subscribe(response => {
        this.currentProduct.published = status;
        console.log(response);
        this.message = response.message;
      },
      error => {
        console.error(error);
      });
  }

  updateProduct(): void {
    this.productService.update(this.url, this.currentProduct).subscribe(response => {
        console.log(response);
        this.message = response.message;

      },
      error => {
        console.error(error);
      });
  }

  deleteProduct(): void {
    this.productService.delete(this.url).subscribe(response => {
        console.log(response);
        this.router.navigate(['/products']);
      },
      error => {
        console.error(error);
      });
  }
}
