import {
  length,
  required,
  TypedFormBuilder,
  TypedFormGroup,
} from '@briebug/forms';

export type State = 'OH' | 'CO' | 'NC';

export interface IAddressForm {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: State;
  zip: number;
}

export class AddressForm extends TypedFormGroup<IAddressForm> {
  readonly addressLine1 = this.getTyped('addressLine1');
  readonly city = this.getTyped('city');
  readonly state = this.getTyped('state');
  readonly zip = this.getTyped('zip');

  constructor(
    readonly address: IAddressForm = {} as IAddressForm,
    readonly fb = new TypedFormBuilder<IAddressForm>()
  ) {
    super({
      controls: {
        addressLine1: [address.addressLine1, required],
        city: [address.city, required],
        state: [address.state, required],
        zip: [address.zip, [required, ...length(5)]],
      },
    });
  }
}
