import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDeactivateGuard } from 'src/app/shared/guards/auth.guard';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
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
    let formData = new FormData();
    // for(let product in this.productForm.value) {
    //   formData.append(product, this.productForm.get(product).value)
    // }

    this.productService.addNewProduct(this.productForm.value).subscribe(res=> {
      if(res) {
        // console.log('ressssssssssssssssssss', res);
        this.productForm.reset();
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
        // console.log('ressssssssssssssssssss', res);
        this.productForm.reset();
      }
    })
  }

  // onImagePicked(event: Event) {
  //   const target= event.target as HTMLInputElement;
  //   let file = (target.files as FileList)[0];
  //   this.productForm.get('imagePath')?.setValue(file)
  //   this.productForm.get('imagePath')?.updateValueAndValidity();
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreview = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);
  // }

  

}