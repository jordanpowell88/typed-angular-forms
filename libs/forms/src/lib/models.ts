import {
  AbstractControlOptions,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { FormConfig } from './config';
import { TypedAbstractControl } from './directives/abstract-control.directive';

export interface FormOperationOptions {
  onlySelf?: boolean;
  emitEvent?: boolean;
  emitModelToViewChange?: boolean;
  emitViewToModelChange?: boolean;
}

export type Status = 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED';

export class TypedFormControl<T> extends FormControl {
  constructor(
    readonly formState?: T | null,
    validator?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(validator, asyncValidator);
  }

  setTypedValue(value: T, options?: Partial<FormOperationOptions>): void {
    this.setValue(value, options);
  }

  patchTypedValue(value: T, options?: Partial<FormOperationOptions>): void {
    this.patchValue(value, options);
  }

  typedReset(value?: T, options?: Partial<FormOperationOptions>): void {
    this.reset(value, options);
  }

  getTypedFormGroup<K extends keyof T>(
    name: Extract<K, string>
  ): TypedFormGroup<T[K]> {
    return this.get(name) as TypedFormGroup<T[K]>;
  }

  getTypedFormArray<K extends keyof T>(
    name: Extract<K, string>
  ): TypedFormArray<T> {
    return this.get(name) as TypedFormArray<T>;
  }
}

export class TypedFormArray<T> extends FormArray {
  constructor(readonly configs: FormConfig<T>[], fb = new FormBuilder()) {
    super(fb.array(configs).controls);
  }

  pushTyped(control: TypedAbstractControl<T>): void {
    this.push(control);
  }

  insertTyped(index: number, control: TypedAbstractControl<T>): void {
    this.insert(index, control);
  }

  setTypedControl(index: number, control: TypedAbstractControl<T>): void {
    this.setControl(index, control);
  }

  setTypedValue(value: T[], options: Partial<FormOperationOptions>): void {
    this.setValue(value, options);
  }

  patchTypedValue(value: T[], options: Partial<FormOperationOptions>): void {
    this.patchValue(value, options);
  }

  typedReset(value: T[], options: Partial<FormOperationOptions>): void {
    this.reset(value, options);
  }

  getTypedRawValue(): T[] {
    return this.getRawValue() as T[];
  }

  getTypedFormGroup<K extends keyof T>(
    name: Extract<K, string>
  ): TypedFormGroup<T[K]> {
    return this.get(name) as TypedFormGroup<T[K]>;
  }

  getTypedFormArray<K extends keyof T>(
    name: Extract<K, string>
  ): TypedFormArray<T> {
    return this.get(name) as TypedFormArray<T>;
  }
}

export class TypedFormGroup<T> extends FormGroup {
  constructor({ controls }: FormConfig<T>, fb = new FormBuilder()) {
    super(fb.group(controls).controls);
  }

  getTyped(name: Extract<keyof T, string>): TypedAbstractControl<T> | null {
    return this.get(name) as TypedAbstractControl<T>;
  }

  registerTypedControl(
    name: Extract<keyof T, string>,
    control: TypedAbstractControl<T>
  ): TypedAbstractControl<T> {
    return this.registerControl(name, control) as TypedAbstractControl<T>;
  }

  addTypedControl(
    name: Extract<keyof T, string>,
    // control: TypedAbstractControl<T[keyof T]>
    control: TypedFormControl<T[keyof T]>
  ): void {
    this.addControl(name, control);
  }

  removeTypedControl(name: Extract<keyof T, string>): void {
    this.removeControl(name);
  }

  setTypedControl(
    name: Extract<keyof T, string>,
    control: TypedAbstractControl<T>
  ): void {
    this.setControl(name, control);
  }

  containsTyped(controlName: Extract<keyof T, string>): boolean {
    return this.contains(controlName);
  }

  setTypedValue(value: T, options?: Partial<FormOperationOptions>): void {
    this.setValue(value, options);
  }

  patchTypedValue(value: T, options?: Partial<FormOperationOptions>): void {
    this.patchValue(value, options);
  }

  typedReset(value?: T, options?: Partial<FormOperationOptions>): void {
    this.reset(value, options);
  }

  getTypedRawValue(): T {
    return this.getRawValue() as T;
  }

  getTypedFormGroup<K extends keyof T>(
    name: Extract<K, string>
  ): TypedFormGroup<T[K]> {
    return this.get(name) as TypedFormGroup<T[K]>;
  }

  getTypedFormArray<K extends keyof T>(
    name: Extract<K, string>
  ): TypedFormArray<T> {
    return this.get(name) as TypedFormArray<T>;
  }
}
