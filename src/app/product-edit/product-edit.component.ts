import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NewProduct, Product, ProductAttributes } from '../_models';
import { ProductsService } from '../_services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  formGroup: FormGroup;
  id: number = 0;
  product: Product;
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {  
    this.route.params.subscribe(params => {
      this.id = params.id;
    });

    this.productsService.show(String(this.id)).subscribe((response) => {
      this.formGroup = this.formBuilder.group({
        txtName: [response.data.attributes.name, Validators.required],
        txtDescription: [response.data.attributes.description, Validators.required],
        txtPrice: [response.data.attributes.price, Validators.required],
      });
    });
  }
  onSubmit(): void {
    const { txtName, txtDescription, txtPrice } = this.formGroup.value;

    const product: ProductAttributes = {
      name: txtName,
      description: txtDescription,
      price: txtPrice,
    };
    this.productsService
      .editProduct(this.id, product)
      .pipe(first())
      .subscribe(() => this.router.navigate(['products'] ));

  }
}
