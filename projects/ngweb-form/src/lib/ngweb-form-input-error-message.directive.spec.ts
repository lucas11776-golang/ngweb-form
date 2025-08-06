import { FormBuilder } from '@angular/forms';
import { NgwebFormInputErrorMessageDirective } from './ngweb-form-input-error-message.directive';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

import { ElementRef } from '@angular/core';

describe('NgwebFormInputErrorMessageDirective', () => {
  it('should check if form error class is add to element if the is error.', () => {
    const config = {message: "The email is required"};
    const form = (new FormBuilder).group({
      "email": ["", [RxwebValidators.required(config)]],
    })
    const el = new ElementRef(document.createElement("div"));
    const directive = new NgwebFormInputErrorMessageDirective(el);
    const formErrorClass = "form-error-input";

    directive.ngwebFormInputErrorMessageClass = formErrorClass;
    directive.ngwebFormInputErrorMessage = [form, 'email', false];

    expect(el.nativeElement.classList.contains(formErrorClass)).toBeTrue();
    expect(el.nativeElement.innerHTML).toBe(config.message);

    form.controls.email.setValue("themba@lucas.com");

    expect(el.nativeElement.classList.contains(formErrorClass)).toBeFalse();
    expect(el.nativeElement.innerHTML).toBe("");
  });

  it('should check if form error class is not set if dirty until input touched.', () => {
    const config = {message: "The email is required"};
    const form = (new FormBuilder).group({
      "email": ["", [RxwebValidators.required(config)]],
    })
    const el = new ElementRef(document.createElement("div"));
    const directive = new NgwebFormInputErrorMessageDirective(el);
    const formErrorClass = "form-error-input";

    directive.ngwebFormInputErrorMessageClass = formErrorClass;
    directive.ngwebFormInputErrorMessage = [form, 'email', true];

    expect(el.nativeElement.classList.contains(formErrorClass)).toBeFalse();
    expect(el.nativeElement.innerHTML).toBe("");

    form.controls.email.setValue("");

    expect(el.nativeElement.classList.contains(formErrorClass)).toBeTrue();
    expect(el.nativeElement.innerHTML).toBe(config.message);
  });

  it('should check if form error class is set if error message.', () => {
    const config = {message: "The email is required"};
    const form = (new FormBuilder).group({
      "email": ["themba@lucas.com", [RxwebValidators.required(config)]],
    })
    const el = new ElementRef(document.createElement("div"));
    const directive = new NgwebFormInputErrorMessageDirective(el);
    const formErrorClass = "form-error-input";

    directive.ngwebFormInputErrorMessageClass = formErrorClass;
    directive.ngwebFormInputErrorMessage = [form, 'email', false];

    expect(el.nativeElement.classList.contains(formErrorClass)).toBeFalse();
    expect(el.nativeElement.innerHTML).toBe("");

    directive.ngwebFormInputErrorMessageExternal = "The email already exists";

    directive.ngOnChanges();

    expect(el.nativeElement.classList.contains(formErrorClass)).toBeTrue();
    expect(el.nativeElement.innerHTML).toBe(directive.ngwebFormInputErrorMessageExternal);
  });
});
