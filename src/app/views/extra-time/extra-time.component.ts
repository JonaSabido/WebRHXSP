import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ExtraTimeDialogComponent } from '../../dialogs/extra-time-dialog/extra-time-dialog.component';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { Crud } from '../../../../shared/helpers/crud';
import { ExtraTimeQueryFilter, ExtraTimeRequest, ExtraTimeResponse } from '../../interfaces/extra-time';
import { ExtraTimeService } from '../../core/services/extra-time.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { EmployeeResponse } from '../../interfaces/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { CardEmployeeFileComponent } from '../../components/card-employee-file/card-employee-file.component';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-extra-time',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule, ToastModule, DropdownModule, InputTextModule, FormsModule, CardEmployeeFileComponent, CalendarModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './extra-time.component.html',
  styleUrl: './extra-time.component.scss'
})
export class ExtraTimeComponent extends Crud<ExtraTimeRequest, ExtraTimeResponse, ExtraTimeQueryFilter> implements OnInit {
  module = 'Tiempos Extra'
  icon = 'pi-clock'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Tiempos Extra'
  dialogConfig: DynamicDialogConfig;
  employees: EmployeeResponse[]


  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: ExtraTimeService,
    public messageService: MessageService,
    private employeeService: EmployeeService

  ) {
    super(dialogService, refDialog, service, messageService)
    this.dialogConfig = {
      header: 'Nueva capacitación',
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
    return this.dialogService.open(ExtraTimeDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_employee: 0,
      date: '',
      files: {
        evidence: '',
      }
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
