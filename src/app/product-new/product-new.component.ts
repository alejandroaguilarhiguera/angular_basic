import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NewProduct } from '../_models';
import { ProductsService } from '../_services/product.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {
  formGroup: FormGroup;
  // checkoutForm = this.formBuilder.group({
  //   name: '',
  //   description: '',
  //   price: 0,
  // });
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }
  name = '';
  description = '';
  price = 0;

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      txtName: ['', [Validators.required, Validators.maxLength(60)]],
      txtDescription: ['', [Validators.required, Validators.maxLength(60)]],
      txtPrice: ['', [Validators.required, Validators.maxLength(100)]],
    });

  }

  onSubmit(): void {
    const { txtName, txtDescription, txtPrice } = this.formGroup.value;

    const newProduct: NewProduct = {
      name: txtName,
      description: txtDescription,
      price: txtPrice,
    };
    this.productsService
      .addProduct(newProduct)
      .pipe(first())
      .subscribe(() => this.router.navigate(['products'] ));

  }


}
