import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AntidopingDialogComponent } from '../../dialogs/antidoping-dialog/antidoping-dialog.component';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { Crud } from '../../../../shared/helpers/crud';
import { AntidopingQueryFilter, AntidopingRequest, AntidopingResponse } from '../../interfaces/antidoping';
import { AntidopingService } from '../../core/services/antidoping.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { EmployeeResponse } from '../../interfaces/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { CardEmployeeFileComponent } from '../../components/card-employee-file/card-employee-file.component';

@Component({
  selector: 'app-antidoping',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule, ToastModule, DropdownModule, InputTextModule, FormsModule, CardEmployeeFileComponent],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './antidoping.component.html',
  styleUrl: './antidoping.component.scss'
})
export class AntidopingComponent extends Crud<AntidopingRequest, AntidopingResponse, AntidopingQueryFilter> implements OnInit {
  module = 'Antidopings'
  icon = 'pi-ticket'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Antidopings'
  dialogConfig: DynamicDialogConfig;
  defaultHeader: string = 'Nuevo Antidoping';
  employees: EmployeeResponse[]


  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: AntidopingService,
    public messageService: MessageService,
    private employeeService: EmployeeService

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
    this.selectedOption = 'id_employee'
    this.employees = []
  }

  protected getRefDialog() {
    return this.dialogService.open(AntidopingDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_employee: 0,
      files: {
        photo: '',
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
    }
  }

  ngOnInit(): void {
    this.employeeService.all().subscribe(response => this.employees = response.data)
  }
}
