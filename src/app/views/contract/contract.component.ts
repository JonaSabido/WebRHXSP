import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ContractDialogComponent } from '../../dialogs/contract-dialog/contract-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { TagModule } from 'primeng/tag';
import { ContractQueryFilter, ContractRequest, ContractResponse } from '../../interfaces/contract';
import { ContractService } from '../../core/services/contract.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { EmployeeResponse } from '../../interfaces/employee';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule, ToastModule, DropdownModule, InputTextModule, FormsModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './contract.component.html',
  styleUrl: './contract.component.scss'
})
export class ContractComponent extends Crud<ContractRequest, ContractResponse, ContractQueryFilter> implements OnInit {
  module = 'Contratos'
  icon = 'pi-book'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Contratos'
  dialogConfig: DynamicDialogConfig;
  employees: EmployeeResponse[]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: ContractService,
    public messageService: MessageService,
    private employeeService: EmployeeService
  ) {
    super(dialogService, refDialog, service, messageService)
    this.dialogConfig = {
      header: 'Nuevo contrato',
      closeOnEscape: false,
      closable: false,
      width: '50%',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    }
    this.selectedOption = 'id_employee'
    this.employees = []
  }

  protected getRefDialog() {
    return this.dialogService.open(ContractDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_employee: 0,
      start_date: '',
      end_date: '',
      status: true
    }
  }

  protected restoreFilters() {
    this.filters = {
      id_employee: {
        property: 'id_employee',
        label: 'Empleado',
        value: null
      },
      start_year: {
        property: 'start_year',
        label: 'Año inicio',
        value: null
      },
      end_year: {
        property: 'end_year',
        label: 'Año final',
        value: null
      },
    }
  }

  ngOnInit(): void {
    this.employeeService.all().subscribe(response => this.employees = response.data)
  }
}
