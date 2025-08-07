# NgwebFormError

This project is angular plugin made to make show errors in angular application as easy
as possible when using reactive form module.

## Getting Started

To get started with NgwebFormError, run:

```bash
npm i ngweb-form-error
```

## Usage

First let's look at our component called `login.component.ts` we will be using `@rxweb/reactive-form-validators`
as validator and bootstrap as css framework.

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgwebFormModule } from 'ngweb-form';

interface RequestFormError {
  message: string;
  errors: {[error: string]: string};
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    NgwebFormModule
  ],
})
export class LoginTestComponent implements OnInit {
  form: FormGroup;
  formErrors: RequestFormError;

  constructor(private builder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      "email": [null, [RxwebValidators.required({message: 'The email is required'})]],
      "password": [null, [RxwebValidators.required({message: 'The password is required'})]],
    });
  }

  login(): void {
    // Some login logic...
  }
}
```

Now let`s setup our template

```html
<div class="container mt-5 mb-5">
    <form [formGroup]="form">
        <!-- Login Error Alert -->
        <div class="mb-3" *ngIf="errors.message">
            <div class="alert alert-danger" role="alert">
                <strong>{{ errors.message }}</strong>
            </div>
        </div>
        <!-- Email Input -->
        <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input name="email"
                   type="email"
                   class="form-control"
                   id="email"
                   placeholder="john@deo.com"
                   formControlName="email"
                   [ngwebFormInputError]="[form, 'email', false]"
                   [ngwebFormInputErrorClass]="'is-invalid'"
                   [ngwebFormInputErrorExternal]="formErrors?.errors?.email">
            <div [ngwebFormInputErrorMessage]="[form, 'email', false]"
                 [ngwebFormInputErrorMessageClass]="'invalid-feedback'"
                 [ngwebFormInputErrorMessageExternal]="formErrors?.errors?.email">
            </div>
        </div>
        <!-- Password Input -->
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input name="password"
                   type="password"
                   class="form-control"
                   id="password"
                   placeholder="********"
                   formControlName="password"
                   [ngwebFormInputError]="[form, 'password', false]"
                   [ngwebFormInputErrorClass]="'is-invalid'"
                   [ngwebFormInputErrorExternal]="formErrors?.errors?.password">
            <div [ngwebFormInputErrorMessage]="[form, 'password', false]"
                 [ngwebFormInputErrorMessageClass]="'invalid-feedback'"
                 [ngwebFormInputErrorMessageExternal]="formErrors?.errors?.password">
        </div>
        <!-- Login Button -->
        <button type="submit" class="btn btn-primary w-100 mt-2" (click)="login()">
            Login
        </button>
    </form>
</div>
```

Now you should see error message for email and password.

## Options

### ngwebFormInputError

`[ngwebFormInputError]`: `[`FormGroup, formControlName, isDirty`]`.

`[ngwebFormInputErrorClass]`: class to add is the is an error.

`[ngwebFormInputErrorExternal]`: external error from server.

### ngwebFormInputErrorMessage

`[ngwebFormInputErrorMessage]`: `[`FormGroup, formControlName, isDirty`]`.

`[ngwebFormInputErrorMessageClass]`: class to add is the is error.

`[ngwebFormInputErrorMessageExternal]`: external error from server.

## Extras

If you as using `@rxweb/reactive-form-validators` stop filling errors message in components do it in your
`app.component.ts` or `app.config.ts`.

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ]
};

ReactiveFormConfig.set({
  "validationMessage": {
    allOf: 'All values must match the allowed set',
    alpha: 'Only alphabetic characters are allowed',
    alphaNumeric: 'Only alphanumeric characters are allowed',
    ascii: 'Only ASCII characters are allowed',
    choice: 'Invalid choice selected',
    compare: 'Values do not match',
    compose: 'Composite validation failed',
    contains: 'Value must contain "{{1}}"',
    creditCard: 'Invalid credit card number',
    dataUri: 'Invalid Data URI format',
    different: 'Value must be different from "{{1}}"',
    digit: 'Only digits are allowed',
    email: 'Invalid email address',
    endsWith: 'Value must end with "{{1}}"',
    even: 'Only even numbers are allowed',
    extension: 'Invalid file extension',
    factor: 'Number must be a factor of "{{1}}"',
    file: 'Invalid file format',
    fileSize: 'File size must not exceed {{1}} KB',
    greaterThanEqualTo: 'Value must be greater than or equal to {{1}}',
    greaterThan: 'Value must be greater than {{1}}',
    ip: 'Invalid IP address',
    image: 'Invalid image format',
    hexColor: 'Invalid HEX color code',
    json: 'Invalid JSON format',
    latitude: 'Invalid latitude value',
    latLong: 'Invalid latitude/longitude format',
    leapYear: 'Year must be a leap year',
    lessThanEqualTo: 'Value must be less than or equal to {{1}}',
    lessThan: 'Value must be less than {{1}}',
    longitude: 'Invalid longitude value',
    lowerCase: 'Value must be in lowercase',
    mac: 'Invalid MAC address',
    maxDate: 'Date must be before or equal to {{1}}',
    maxLength: 'Maximum length is {{1}} characters',
    maxNumber: 'Value must not exceed {{1}}',
    minDate: 'Date must be after or equal to {{1}}',
    minLength: 'Minimum length is {{1}} characters',
    minNumber: 'Value must be at least {{1}}',
    noneOf: 'Value must not match any of the restricted options',
    numeric: 'Only numeric values are allowed',
    odd: 'Only odd numbers are allowed',
    oneOf: 'Value must be one of the allowed options',
    password: 'Password does not meet strength requirements',
    pattern: 'Value does not match required pattern',
    port: 'Invalid port number',
    primeNumber: 'Value must be a prime number',
    range: 'Value must be between {{1}} and {{2}}',
    required: 'This field is required',
    startsWith: 'Value must start with "{{1}}"',
    time: 'Invalid time format (HH:mm:ss)',
    unique: 'Value must be unique',
    upperCase: 'Value must be in uppercase',
    url: 'Invalid URL format'
  }
});
```