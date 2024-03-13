import { Component, Type } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeReentryDialogComponent } from '../../dialogs/employee-reentry-dialog/employee-reentry-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';


@Component({
  selector: 'app-employee-reentry',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule],
  providers: [DialogService, DynamicDialogRef,],
  templateUrl: './employee-reentry.component.html',
  styleUrl: './employee-reentry.component.scss'
})
export class EmployeeReentryComponent extends Crud {
  module = 'Reingresos'
  icon = 'pi-angle-double-up'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Reingresos'
  dialogConfig: DynamicDialogConfig;
  entities = [
    {
      employee: 'Juan Olmo',
      date: '24 Febrero 2024'
    },
    {
      employee: 'Maria Rodriguez',
      date: '14 Febrero 2024'
    },
    {
      employee: 'Maria Rodriguez',
      date: '04 Enero 2022'
    },
    {
      employee: 'Luis Martinez',
      date: '30 Marzo 2022'
    },
    {
      employee: 'Luis Martinez',
      date: '31 Agosto 2020'
    }
  ]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
  ) {
    super(dialogService, refDialog)
    this.dialogConfig = {
      header: 'Nuevo reingreso',
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

  protected getRefDialog(){
    return this.dialogService.open(EmployeeReentryDialogComponent, this.dialogConfig)
  }

}
