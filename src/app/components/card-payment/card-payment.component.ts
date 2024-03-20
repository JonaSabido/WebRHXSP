import { Component, Input } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-card-payment',
  standalone: true,
  imports: [TagModule],
  templateUrl: './card-payment.component.html',
  styleUrl: './card-payment.component.scss'
})
export class CardPaymentComponent {
  @Input() payment: any
}
