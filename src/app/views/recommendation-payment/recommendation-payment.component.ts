import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { CardPaymentComponent } from '../../components/card-payment/card-payment.component';
import { RecommendationPaymentQueryFilter, RecommendationPaymentRequest, RecommendationPaymentResponse } from '../../interfaces/recommendation-payment';
import { Crud } from '../../../../shared/helpers/crud';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { RecommendationPaymentService } from '../../core/services/recommendation-payment.service';
import { RecommendationDialogComponent } from '../../dialogs/recommendation-dialog/recommendation-dialog.component';
import { RecomendationPaymentDialogComponent } from '../../dialogs/recomendation-payment-dialog/recomendation-payment-dialog.component';

@Component({
  selector: 'app-recommendation-payment',
  standalone: true,
  imports: [BreadcrumbComponent, CardPaymentComponent],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './recommendation-payment.component.html',
  styleUrl: './recommendation-payment.component.scss'
})
export class RecommendationPaymentComponent extends Crud<RecommendationPaymentRequest, RecommendationPaymentResponse, RecommendationPaymentQueryFilter> {
  module = 'Pagos'
  icon = 'pi-dollar'
  prevLinks = ['Home', 'Recomendaciones']
  activeLink = 'Pagos'
  dialogConfig: DynamicDialogConfig;

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: RecommendationPaymentService,
    public messageService: MessageService,
  ) {
    super(dialogService, refDialog, service, messageService)
    this.dialogConfig = {
      showHeader: false,
      closeOnEscape: true,
      closable: true,
      contentStyle: { 'padding': '0px', 'border-radius': '10px' },
      style: { 'border-radius': '10px' },
      width: '40%',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    }
  }

  protected getRefDialog() {
    return this.dialogService.open(RecomendationPaymentDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_recommendation: 0,
      id_paying_employee: 0,
      payment_date: '',
      status: 1,
    }
  }

  protected restoreFilters() {

  }
}
