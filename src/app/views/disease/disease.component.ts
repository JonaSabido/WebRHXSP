import { Component, OnInit } from '@angular/core';
import { DiseaseDialogComponent } from '../../dialogs/disease-dialog/disease-dialog.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { View } from '../../../../shared/helpers/view';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Crud } from '../../../../shared/helpers/crud';
import { DiseaseRequest, DiseaseResponse } from '../../interfaces/disease';
import { DiseaseService } from '../../core/services/disease.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-disease',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, ToastModule],
  providers: [DialogService, DynamicDialogRef,],
  templateUrl: './disease.component.html',
  styleUrl: './disease.component.scss'
})
export class DiseaseComponent extends Crud<DiseaseRequest, DiseaseResponse> implements OnInit {
  module = 'Enfermedades'
  icon = 'pi-heart'
  prevLinks = ['Home', 'Empresa']
  activeLink = 'Enfermedades'
  dialogConfig: DynamicDialogConfig;

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: DiseaseService,
    public messageService: MessageService,
  ) {
    super(dialogService, refDialog, service, messageService)
    this.dialogConfig = {
      header: 'Nueva enfermedad',
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
    return this.dialogService.open(DiseaseDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      name: "",
    }
  }

  ngOnInit(): void {
  }
}