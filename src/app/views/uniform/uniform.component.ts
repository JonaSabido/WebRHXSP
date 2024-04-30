import { Component, OnInit, Type } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UniformDialogComponent } from '../../dialogs/uniform-dialog/uniform-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { TagModule } from 'primeng/tag';
import { UniformQueryFilter, UniformRequest, UniformResponse, UniformTypes } from '../../interfaces/uniform';
import { UniformService } from '../../core/services/uniform.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { EmployeeResponse } from '../../interfaces/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { CalendarModule } from 'primeng/calendar';


@Component({
  selector: 'app-uniform',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule, ToastModule, DropdownModule, InputTextModule, FormsModule, CalendarModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './uniform.component.html',
  styleUrl: './uniform.component.scss'
})
export class UniformComponent extends Crud<UniformRequest, UniformResponse, UniformQueryFilter> implements OnInit {
  module = 'Uniformes'
  icon = 'pi-gift'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Uniformes'
  dialogConfig: DynamicDialogConfig;
  employees: EmployeeResponse[]
  types = UniformTypes

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: UniformService,
    public messageService: MessageService,
    private employeeService: EmployeeService
  ) {
    super(dialogService, refDialog, service, messageService)
    this.dialogConfig = {
      header: 'Nuevo uniforme',
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
    return this.dialogService.open(UniformDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_employee: 0,
      type: 0,
      delivered_date: '',
      comments: ''
    }
  }

  protected restoreFilters() {
    this.filters = {
      id_employee: {
        property: 'id_employee',
        label: 'Empleado',
        value: null
      },
      type: {
        property: 'type',
        label: 'Tipo',
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
