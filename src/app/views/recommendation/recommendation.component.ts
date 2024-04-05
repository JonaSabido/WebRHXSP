import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Crud } from '../../../../shared/helpers/crud';
import { RecommendationDialogComponent } from '../../dialogs/recommendation-dialog/recommendation-dialog.component';
import { TagModule } from 'primeng/tag';
import { RecommendationRequest, RecommendationResponse } from '../../interfaces/recommendation';
import { RecommendationService } from '../../core/services/recommendation.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-recommendation',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule, ToastModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.scss'
})
export class RecommendationComponent extends Crud<RecommendationRequest, RecommendationResponse> implements OnInit {
  module = 'Registros'
  icon = 'pi-list'
  prevLinks = ['Home', 'Recomendaciones']
  activeLink = 'Registros'
  dialogConfig: DynamicDialogConfig;

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: RecommendationService,
    public messageService: MessageService,
  ) {
    super(dialogService, refDialog, service, messageService)
    this.dialogConfig = {
      header: 'Nueva recomendación',
      closeOnEscape: false,
      closable: false,
      width: '50%',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    }
  }

  protected getRefDialog() {
    return this.dialogService.open(RecommendationDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_employee: 0,
      id_recommended_employee: 0,
      amount: 300,
    }
  }

  protected restoreFilters(){
    
  }

  ngOnInit(): void {

  }

}
