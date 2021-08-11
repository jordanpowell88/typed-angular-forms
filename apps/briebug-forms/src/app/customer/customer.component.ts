import { Component } from '@angular/core';
import { CustomerForm } from './customer-form';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent {
  form = new CustomerForm();
}
