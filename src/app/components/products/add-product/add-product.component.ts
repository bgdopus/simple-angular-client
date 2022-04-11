import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDeactivateGuard } from 'src/app/shared/guards/auth.guard';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, IDeactivateGuard {
  productForm: any;
  isEditAction: boolean = false;
  params: any = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    this.route.queryParams
      .subscribe(params =>  this.params = params );
    this.isEditAction = Boolean(Object.keys(this.params).length);
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl(this.isEditAction? this.params.name : "", [Validators.required]),
      type: new FormControl(this.isEditAction? this.params.type : "", [Validators.required]),
      description: new FormControl(this.isEditAction? this.params.description : "", [Validators.required])
    })
  }

  canExit(): boolean {
    if (this.productForm.touched) {
      return confirm('Are you sure to navigate away, All changes will lost !')
    }
    return true
  }

  onAddProduct() {
    if(this.productForm.invalid) return;

    this.productService.addNewProduct(this.productForm.value).subscribe(res=> {
      if(res) {
        this.productForm.reset();
        this.router.navigate(['/products/list']);
      }
    })
  }

  onEditProduct() {
    if(this.productForm.invalid) return;

    const newItem = {
      id: this.params.id,
      name: this.productForm.value.name,
      type: this.productForm.value.type,
      description: this.productForm.value.description
    };
    this.productService.updateProduct(newItem).subscribe(res=> {
      if(res) {
        this.productForm.reset();
        this.router.navigate(['/products/list']);
      }
    })
  }
}