import { Component, OnInit, Type } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeReentryDialogComponent } from '../../dialogs/employee-reentry-dialog/employee-reentry-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { TagModule } from 'primeng/tag';
import { EmployeeReentryQueryFilter, EmployeeReentryRequest, EmployeeReentryResponse } from '../../interfaces/employee-reentry';
import { EmployeeReentryService } from '../../core/services/employee-reentry.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { EmployeeResponse } from '../../interfaces/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { CalendarModule } from 'primeng/calendar';


@Component({
  selector: 'app-employee-reentry',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule, ToastModule, DropdownModule, InputTextModule, FormsModule, CalendarModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './employee-reentry.component.html',
  styleUrl: './employee-reentry.component.scss'
})
export class EmployeeReentryComponent extends Crud<EmployeeReentryRequest, EmployeeReentryResponse, EmployeeReentryQueryFilter> implements OnInit {
  module = 'Reingresos'
  icon = 'pi-angle-double-up'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Reingresos'
  dialogConfig: DynamicDialogConfig;
  employees: EmployeeResponse[]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: EmployeeReentryService,
    public messageService: MessageService,
    private employeeService: EmployeeService
  ) {
    super(dialogService, refDialog, service, messageService)
    this.dialogConfig = {
      header: 'Nuevo reingreso',
      closeOnEscape: true,
      closable: true,
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
    return this.dialogService.open(EmployeeReentryDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_employee: 0,
      reentry_date: '',
      description: ''
    }
  }

  protected restoreFilters() {
    this.filters = {
      id_employee: {
        property: 'id_employee',
        label: 'Empleado',
        value: null
      },
      year: {
        property: 'year',
        label: 'Año',
        value: null
      },
      start_date: {
        property: 'start_date',
        label: 'Fecha Inicio',
        value: ''
      },
      end_date: {
        property: 'end_date',
        label: 'Fecha Final',
        value: ''
      },
    }
  }

  ngOnInit(): void {
    this.employeeService.all().subscribe(response => this.employees = response.data)
  }

}
