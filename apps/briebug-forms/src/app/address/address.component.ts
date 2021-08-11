import { Component } from '@angular/core';
import { AddressForm, State } from './address-form';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent {
  form = new AddressForm();
  states: State[] = ['CO', 'OH', 'NC'];
}
