import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ListProductComponent } from './list-product/list-product.component';

export const routes: Routes = [
  {
    path: 'add',
    component: AddProductComponent,
    canDeactivate: [AuthGuard]

  },
  {
    path: 'edit/:id',
    component: AddProductComponent
  },
  {
    path: 'list',
    component: ListProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
