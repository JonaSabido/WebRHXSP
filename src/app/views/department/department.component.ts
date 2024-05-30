import { Component, OnInit } from '@angular/core';
import { View } from '../../../../shared/helpers/view';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DepartmentDialogComponent } from '../../dialogs/department-dialog/department-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { DepartmentQueryFilter, DepartmentRequest, DepartmentResponse } from '../../interfaces/department';
import { DepartmentService } from '../../core/services/department.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-department',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, ToastModule, DropdownModule, InputTextModule, FormsModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent extends Crud<DepartmentRequest, DepartmentResponse, DepartmentQueryFilter> implements OnInit {
  module = 'Departamentos'
  icon = 'pi-building'
  prevLinks = ['Home', 'Empresa']
  activeLink = 'Departamentos'
  dialogConfig: DynamicDialogConfig;
  defaultHeader: string = 'Nuevo Departamento';

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: DepartmentService,
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
    return this.dialogService.open(DepartmentDialogComponent, this.dialogConfig)
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
