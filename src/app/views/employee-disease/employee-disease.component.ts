import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { View } from '../../../../shared/helpers/view';
import { EmployeeDiseaseDialogComponent } from '../../dialogs/employee-disease-dialog/employee-disease-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { EmployeeDiseaseRequest, EmployeeDiseaseResponse } from '../../interfaces/employee-disease';
import { EmployeeDiseaseService } from '../../core/services/employee-disease.service';

@Component({
  selector: 'app-employee-disease',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule],
  providers: [DialogService, DynamicDialogRef,],
  templateUrl: './employee-disease.component.html',
  styleUrl: './employee-disease.component.scss'
})
export class EmployeeDiseaseComponent extends Crud<EmployeeDiseaseRequest, EmployeeDiseaseResponse> implements OnInit {
  module = 'Enfermedades'
  icon = 'pi-heart'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Enfermedades'
  dialogConfig: DynamicDialogConfig;

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: EmployeeDiseaseService
  ) {
    super(dialogService, refDialog, service)
    this.dialogConfig = {
      header: 'Nuevo enfermedad de empleado',
      closeOnEscape: false,
      closable: false,
      width: '50%',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    }
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

  ngOnInit(): void {

  }
}