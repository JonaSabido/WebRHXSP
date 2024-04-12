import { Component, OnInit } from '@angular/core';
import { View } from '../../../../shared/helpers/view';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { EmergencyDialogComponent } from '../../dialogs/emergency-dialog/emergency-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { EmergencyQueryFilter, EmergencyRequest, EmergencyResponse } from '../../interfaces/emergency';
import { EmergencyService } from '../../core/services/emergency.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { EmployeeResponse } from '../../interfaces/employee';

@Component({
  selector: 'app-emergency',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, ToastModule, DropdownModule, InputTextModule, FormsModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './emergency.component.html',
  styleUrl: './emergency.component.scss'
})
export class EmergencyComponent extends Crud<EmergencyRequest, EmergencyResponse, EmergencyQueryFilter> implements OnInit {
  module = 'Números de emergencia'
  icon = 'pi-phone'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Números de emergencia'
  dialogConfig: DynamicDialogConfig;
  employees: EmployeeResponse[]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: EmergencyService,
    public messageService: MessageService,
    private employeeService: EmployeeService
  ) {
    super(dialogService, refDialog, service, messageService)
    this.dialogConfig = {
      header: 'Nuevo número de emergencia',
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
    return this.dialogService.open(EmergencyDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_employee: 0,
      reference_name: '',
      type: '',
      phone: ''
    }
  }

  protected restoreFilters() {
    this.filters = {
      id_employee: {
        property: 'id_employee',
        label: 'Empleado',
        value: null
      },
      reference_name: {
        property: 'reference_name',
        label: 'Familiar',
        value: null
      },
      type: {
        property: 'type',
        label: 'Parentesco',
        value: ''
      },
    }
  }

  ngOnInit(): void {
    this.employeeService.all().subscribe(response => this.employees = response.data)
  }
}