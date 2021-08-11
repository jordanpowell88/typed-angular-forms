import {
  AbstractControlOptions,
  AsyncValidatorFn,
  FormBuilder,
  ValidatorFn,
} from '@angular/forms';
import { FormConfig } from './config';
import { TypedFormArray, TypedFormControl, TypedFormGroup } from './models';

export class TypedFormBuilder<T> extends FormBuilder {
  constructor(fb = new FormBuilder()) {
    super();
  }

  control(
    formState?: Partial<T> | null,
    validator?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ): TypedFormControl<T[keyof T]> {
    return new TypedFormControl<T[keyof T]>(
      formState as T[keyof T],
      validator,
      asyncValidator
    );
  }

  group(config: FormConfig<T>): TypedFormGroup<T> {
    return new TypedFormGroup<T>(config);
  }

  array(configs: FormConfig<T>[]): TypedFormArray<T> {
    return new TypedFormArray<T>(configs);
  }
}
