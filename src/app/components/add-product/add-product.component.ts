import { Component, OnInit} from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: Product = {
    nom: '',
    description: '',
    prix: 0
  };

  submitted = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
  }

  saveProduct(): void {
    const data = {
      nom: this.product.nom,
      description: this.product.description,
      prix: this.product.prix
    };
    
    this.productService.create(data).subscribe(
      response => {
        console.log(response);
        this.submitted = true;
        
      },
      error => {
        console.error(error);
      }
    );
  }

  newProduct(): void {
    this.product = {
      nom: '',
      description: '',
      prix: 0
    };
    this.submitted = false;
  }
}
