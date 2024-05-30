import { Component, OnInit } from '@angular/core';
import { View } from '../../../../shared/helpers/view';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RecruitmentMethodDialogComponent } from '../../dialogs/recruitment-method-dialog/recruitment-method-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { RecruitmentMethodQueryFilter, RecruitmentMethodRequest, RecruitmentMethodResponse } from '../../interfaces/recruitment-method';
import { RecruitmentMethodService } from '../../core/services/recruitment-method.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recruitment-method',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, ToastModule, DropdownModule, InputTextModule, FormsModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './recruitment-method.component.html',
  styleUrl: './recruitment-method.component.scss'
})
export class RecruitmentMethodComponent extends Crud<RecruitmentMethodRequest, RecruitmentMethodResponse, RecruitmentMethodQueryFilter> implements OnInit {
  module = 'Métodos de Reclutamiento'
  icon = 'pi-share-alt'
  prevLinks = ['Home', 'Empresa']
  activeLink = 'Métodos de Reclutamiento'
  dialogConfig: DynamicDialogConfig;
  defaultHeader: string = 'Nuevo Método de Reclutamiento';

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: RecruitmentMethodService,
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
    return this.dialogService.open(RecruitmentMethodDialogComponent, this.dialogConfig)
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
