import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { View } from '../../../../shared/helpers/view';
import { EmployeeLeaveDialogComponent } from '../../dialogs/employee-leave-dialog/employee-leave-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { TagModule } from 'primeng/tag';
import { EmployeeLeaveQueryFilter, EmployeeLeaveRequest, EmployeeLeaveResponse } from '../../interfaces/employee-leave';
import { EmployeeLeaveService } from '../../core/services/employee-leave.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { EmployeeResponse } from '../../interfaces/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-employee-leave',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule, ToastModule, DropdownModule, InputTextModule, FormsModule, CalendarModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './employee-leave.component.html',
  styleUrl: './employee-leave.component.scss'
})
export class EmployeeLeaveComponent extends Crud<EmployeeLeaveRequest, EmployeeLeaveResponse, EmployeeLeaveQueryFilter> implements OnInit {
  module = 'Bajas'
  icon = 'pi-angle-double-down'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Bajas'
  dialogConfig: DynamicDialogConfig;
  employees: EmployeeResponse[]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: EmployeeLeaveService,
    public messageService: MessageService,
    private employeeService: EmployeeService
  ) {
    super(dialogService, refDialog, service, messageService)
    this.dialogConfig = {
      header: 'Nueva baja',
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
    return this.dialogService.open(EmployeeLeaveDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_employee: 0,
      leave_date: '',
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
