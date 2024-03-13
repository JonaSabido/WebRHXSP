import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { View } from '../../../../shared/helpers/view';
import { EmployeeDiseaseDialogComponent } from '../../dialogs/employee-disease-dialog/employee-disease-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';

@Component({
  selector: 'app-employee-disease',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule],
  providers: [DialogService, DynamicDialogRef,],
  templateUrl: './employee-disease.component.html',
  styleUrl: './employee-disease.component.scss'
})
export class EmployeeDiseaseComponent extends Crud {
  module = 'Enfermedades'
  icon = 'pi-heart'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Enfermedades'
  dialogConfig: DynamicDialogConfig;
  entities = [
    {
      employee: 'Juan Olmo',
      disease: 'Alergia a la penicilina'
    },
    {
      employee: 'Maria Rodriguez',
      disease: 'Hipertensión'
    },
    {
      employee: 'Maria Rodriguez',
      disease: 'Diabetes',
    },
    {
      employee: 'Luis Martinez',
      disease: 'Hipertensión',
    },
    {
      employee: 'Luis Martinez',
      disease: 'Ansiedad'
    }
  ]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
  ) {
    super(dialogService, refDialog)
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
}