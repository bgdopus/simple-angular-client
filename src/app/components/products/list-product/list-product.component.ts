import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  products: any;
  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe(res=> {
      if(res) {
        this.toastr.success(res.message)
        this.products = res.items;
      }
    })
  }

  onDeleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(res=> {
      if(res) {
        let index = this.products.findIndex((p: any) => p.id === productId);
        if(index > -1) {
          this.products.splice(index, 1);
          this.toastr.success(res.message)
        }
      }
    })
  }

}
