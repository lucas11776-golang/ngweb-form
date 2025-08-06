import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SubSink } from 'subsink';

@Directive({
  selector: '[ngwebFormInputError]',
  standalone: false,
})
export class NgwebFormInputErrorDirective implements OnChanges, OnDestroy {
  @Input() set ngwebFormInputError(input: [FormGroup, string, boolean]) {
    this.element = <HTMLElement>this.el.nativeElement;
    this.sub.sink = this.listener(input[0], input[1], input[2]);
  }
  @Input("ngwebFormInputErrorClass") ngwebFormInputErrorClass: string = "is-invalid";
  @Input("ngwebFormInputErrorExternal") ngwebFormInputErrorExternal: string|null|undefined = "";

  private element: HTMLElement;
  private sub = new SubSink();

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    !this.ngwebFormInputErrorExternal ?
      null :
      this.element.classList.add(this.ngwebFormInputErrorClass)
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
    control.errors ?
      this.element.classList.add(this.ngwebFormInputErrorClass):
      this.element.classList.remove(this.ngwebFormInputErrorClass);
  }
}
