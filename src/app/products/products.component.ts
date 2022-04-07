import { Component, OnInit } from '@angular/core';
import { ProductsService, AuthService } from '../_services';
import { Product } from '../_models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private authService: AuthService,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    
  }

  ngOnInit() {
    this.productsService.getAll().subscribe((response) => {
      return this.products = response.data;
    });
  }
  onDelete_click(id: string) {
    this.productsService.deleteProducts(id).subscribe((response) => {
      return this.products = this.products.filter(product => product.id !== id);
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
