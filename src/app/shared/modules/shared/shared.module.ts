import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const sharedModules = [
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [],
  imports: [
    sharedModules
  ],
  exports: [
    sharedModules
  ]
})
export class SharedModule { }
