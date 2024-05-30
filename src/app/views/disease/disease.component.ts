import { Component, OnInit } from '@angular/core';
import { DiseaseDialogComponent } from '../../dialogs/disease-dialog/disease-dialog.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { View } from '../../../../shared/helpers/view';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Crud } from '../../../../shared/helpers/crud';
import { DiseaseQueryFilter, DiseaseRequest, DiseaseResponse } from '../../interfaces/disease';
import { DiseaseService } from '../../core/services/disease.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-disease',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, ToastModule, DropdownModule, InputTextModule, FormsModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './disease.component.html',
  styleUrl: './disease.component.scss'
})
export class DiseaseComponent extends Crud<DiseaseRequest, DiseaseResponse, DiseaseQueryFilter> implements OnInit {
  module = 'Enfermedades'
  icon = 'pi-heart'
  prevLinks = ['Home', 'Empresa']
  activeLink = 'Enfermedades'
  dialogConfig: DynamicDialogConfig;
  defaultHeader: string = 'Nueva Enfermedad';


  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: DiseaseService,
    public messageService: MessageService,
  ) {
    super(dialogService, refDialog, service, messageService)
    this.dialogConfig = {
      closeOnEscape: true,
      closable: true,
      width: '50%',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    }
    this.selectedOption = 'name'
  }

  protected getRefDialog() {
    return this.dialogService.open(DiseaseDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      name: "",
    }
  }

  protected restoreFilters() {
    this.filters = {
      name: {
        property: 'name',
        label: 'Nombre',
        value: ''
      },
    }
  }

  ngOnInit(): void {
  }
}