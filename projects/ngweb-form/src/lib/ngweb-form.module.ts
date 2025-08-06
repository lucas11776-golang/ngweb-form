import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgwebFormInputErrorDirective } from './ngweb-form-input-error.directive';

@NgModule({
  declarations: [
    NgwebFormInputErrorDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class NgwebFormModule { }
