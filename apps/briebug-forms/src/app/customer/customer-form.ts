import {
  email,
  required,
  TypedFormBuilder,
  TypedFormGroup,
} from '@briebug/forms';
import { AddressForm, IAddressForm } from '../address/address-form';

interface ICustomerForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: IAddressForm;
}

export class CustomerForm extends TypedFormGroup<ICustomerForm> {
  readonly firstName = this.getTyped('firstName');
  readonly lastName = this.getTyped('lastName');
  readonly email = this.getTyped('email');
  readonly phone = this.getTyped('phone');

  get Address(): AddressForm {
    return this.getTypedFormGroup('address') as AddressForm;
  }

  constructor(
    readonly customer: ICustomerForm = {} as ICustomerForm,
    readonly fb = new TypedFormBuilder<ICustomerForm>()
  ) {
    super({
      controls: {
        firstName: [customer.firstName, [required]],
        lastName: [customer.lastName, [required]],
        email: [customer.email, [required, email]],
        phone: customer.phone,
        address: new AddressForm(customer.address),
      },
    });
  }
}
