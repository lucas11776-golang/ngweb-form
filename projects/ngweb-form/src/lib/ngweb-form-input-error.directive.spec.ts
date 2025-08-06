import { ElementRef, inject } from '@angular/core';
import { NgwebFormInputErrorDirective } from './ngweb-form-input-error.directive';
import { FormBuilder, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

describe('NgwebFormInputErrorDirective', () => {
  it('should check if form error class is add to element if the is error.', () => {
    const form = (new FormBuilder).group({
      "email": ["", [RxwebValidators.required({message: "The email is required"})]],
    })
    const el = new ElementRef(document.createElement("input"));
    const directive = new NgwebFormInputErrorDirective(el);
    const formErrorClass = "form-error-input";

    directive.ngwebFormInputErrorClass = formErrorClass;
    directive.ngwebFormInputError = [form, 'email', false];

    expect(el.nativeElement.classList.contains(formErrorClass)).toBeTrue();

    form.controls.email.setValue("themba@lucas.com");

    expect(el.nativeElement.classList.contains(formErrorClass)).toBeFalse();

    directive.ngOnDestroy();
  });

  it('should check if form error class is not set if dirty until input touched.', () => {
    const form = (new FormBuilder).group({
      "email": ["", [RxwebValidators.required({message: "The email is required"})]],
    })
    const el = new ElementRef(document.createElement("input"));
    const directive = new NgwebFormInputErrorDirective(el);
    const formErrorClass = "form-error-input";

    directive.ngwebFormInputErrorClass = formErrorClass;
    directive.ngwebFormInputError = [form, 'email', true];

    expect(el.nativeElement.classList.contains(formErrorClass)).toBeFalse();

    form.controls.email.setValue("");

    expect(el.nativeElement.classList.contains(formErrorClass)).toBeTrue();

    directive.ngOnDestroy();
  });

  it('should check if form error class is set if error message', () => {
    const form = (new FormBuilder).group({
      "email": ["themba@lucas.com", [RxwebValidators.required({message: "The email is required"})]],
    })
    const el = new ElementRef(document.createElement("input"));
    const directive = new NgwebFormInputErrorDirective(el);
    const formErrorClass = "form-error-input";

    directive.ngwebFormInputErrorClass = formErrorClass;
    directive.ngwebFormInputError = [form, 'email', true];

    expect(el.nativeElement.classList.contains(formErrorClass)).toBeFalse();

    directive.ngwebFormInputErrorExternal = "The email already exist";

    directive.ngOnChanges();

    expect(el.nativeElement.classList.contains(formErrorClass)).toBeTrue();
    
    directive.ngOnDestroy();
  });
});
