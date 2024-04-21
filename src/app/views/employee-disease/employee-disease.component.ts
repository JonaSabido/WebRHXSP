import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeDiseaseDialogComponent } from '../../dialogs/employee-disease-dialog/employee-disease-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { EmployeeDiseaseQueryFilter, EmployeeDiseaseRequest, EmployeeDiseaseResponse } from '../../interfaces/employee-disease';
import { EmployeeDiseaseService } from '../../core/services/employee-disease.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { EmployeeResponse } from '../../interfaces/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { DiseaseResponse } from '../../interfaces/disease';
import { DiseaseService } from '../../core/services/disease.service';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-disease',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, ToastModule, DropdownModule, InputTextModule, FormsModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './employee-disease.component.html',
  styleUrl: './employee-disease.component.scss'
})
export class EmployeeDiseaseComponent extends Crud<EmployeeDiseaseRequest, EmployeeDiseaseResponse, EmployeeDiseaseQueryFilter> implements OnInit {
  module = 'Enfermedades'
  icon = 'pi-heart'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Enfermedades'
  dialogConfig: DynamicDialogConfig;
  employees: EmployeeResponse[]
  diseases: DiseaseResponse[]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: EmployeeDiseaseService,
    public messageService: MessageService,
    private employeeService: EmployeeService,
    private diseaseService: DiseaseService
  ) {
    super(dialogService, refDialog, service, messageService)
    this.dialogConfig = {
      header: 'Nuevo enfermedad de empleado',
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
    this.diseases = []
  }

  protected getRefDialog() {
    return this.dialogService.open(EmployeeDiseaseDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_employee: 0,
      id_disease: 0
    }
  }

  protected restoreFilters() {
    this.filters = {
      id_employee: {
        property: 'id_employee',
        label: 'Empleado',
        value: null
      },
      id_disease: {
        property: 'id_disease',
        label: 'Enfermedad',
        value: null
      },

    }
  }

  ngOnInit(): void {
    this.employeeService.all().subscribe(response => this.employees = response.data)
    this.diseaseService.all().subscribe(response => this.diseases = response.data)
  }
}