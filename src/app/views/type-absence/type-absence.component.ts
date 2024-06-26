import { Component, OnInit } from '@angular/core';
import { View } from '../../../../shared/helpers/view';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TypeAbsenceDialogComponent } from '../../dialogs/type-absence-dialog/type-absence-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { TypeAbsenceQueryFilter, TypeAbsenceRequest, TypeAbsenceResponse } from '../../interfaces/type-absence';
import { TypeAbsenceService } from '../../core/services/type-absence.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-type-absence',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, ToastModule, DropdownModule, InputTextModule, FormsModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './type-absence.component.html',
  styleUrl: './type-absence.component.scss'
})
export class TypeAbsenceComponent extends Crud<TypeAbsenceRequest, TypeAbsenceResponse, TypeAbsenceQueryFilter> implements OnInit {
  module = 'Tipos de faltas'
  icon = 'pi-stopwatch'
  prevLinks = ['Home', 'Empresa']
  activeLink = 'Tipos de faltas'
  dialogConfig: DynamicDialogConfig;
  defaultHeader: string = 'Nuevo Tipo de Falta';

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: TypeAbsenceService,
    public messageService: MessageService,
  ) {
    super(dialogService, refDialog, service, messageService)
    this.dialogConfig = {
      header: 'Nuevo tipo de falta',
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
    return this.dialogService.open(TypeAbsenceDialogComponent, this.dialogConfig)
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
