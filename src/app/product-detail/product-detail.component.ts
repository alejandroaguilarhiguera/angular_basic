import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_models';
import { ProductsService } from '../_services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: string = '1';
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });

    this.productsService.show(this.id).subscribe((response) => {
      // if (!response.meta) {
      //   this.router.navigate(['products']);
      // }
      return this.product = response.data;
    });
  }

}
