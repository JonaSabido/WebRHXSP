import { Component, } from '@angular/core';
import { DialogCrud } from '../../../../shared/helpers/dialog';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule, NgForm } from '@angular/forms';
import { CardPaymentComponent } from '../../components/card-payment/card-payment.component';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-recomendation-payment-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule, DropdownModule, FormsModule, CardPaymentComponent, TagModule],
  templateUrl: './recomendation-payment-dialog.component.html',
  styleUrl: './recomendation-payment-dialog.component.scss'
})
export class RecomendationPaymentDialogComponent extends DialogCrud {
  statusValue: number;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
    super(ref, config)
    this.statusValue = this.config.data.entity.status
  }

  changeStatus(value: number) {
    this.statusValue += value;
    if (this.statusValue == 0) {
      this.statusValue = 3
    }
    else if (this.statusValue > 3) {
      this.statusValue = 1
    }
    this.config.data.entity.status = this.statusValue
  }
}
