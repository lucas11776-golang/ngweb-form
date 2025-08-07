import { Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SubSink } from 'subsink';

@Directive({
  selector: '[libNgwebFormInputErrorMessage]'
})
export class NgwebFormInputErrorMessageDirective implements OnDestroy, OnChanges {
  @Input("ngwebFormInputErrorMessage") set ngwebFormInputErrorMessage(input: [FormGroup, string, boolean]) {
    this.element = <HTMLElement>this.el.nativeElement;
    this.sub.sink = this.listener(input[0], input[1], input[2]);
  }
  @Input("ngwebFormInputErrorMessageClass") ngwebFormInputErrorMessageClass: string = "";
  @Input("ngwebFormInputErrorMessageExternal") ngwebFormInputErrorMessageExternal: string|null|undefined = "";

  private element: HTMLElement;
  private sub = new SubSink();

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    !this.ngwebFormInputErrorMessageExternal
      ? null
      : this.add(this.ngwebFormInputErrorMessageExternal);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private listener(form: FormGroup, formControlName: string, dirty: boolean): Subscription|null {
    const control = form.get(formControlName);

    if (!control) return null;

    if (!dirty) this.validate(control);

    return control.valueChanges.subscribe(() => this.validate(control));
  }

  private validate(control: AbstractControl<any, any>): void {
    !control.errors ?
      this.remove() :
      this.add(control.errors?.[Object.keys(control.errors)[0]]?.message)
  }

  private add(error: string) {
    this.element.innerHTML = error;
    !this.ngwebFormInputErrorMessageClass
      ? null
      : this.element.classList.add(this.ngwebFormInputErrorMessageClass);
  }

  private remove() {
    this.element.innerHTML = "";
    !this.ngwebFormInputErrorMessageClass
      ? null
      : this.element.classList.remove(this.ngwebFormInputErrorMessageClass);
  }
}