import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { View } from '../../../../shared/helpers/view';
import { EmployeeLeaveDialogComponent } from '../../dialogs/employee-leave-dialog/employee-leave-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';

@Component({
  selector: 'app-employee-leave',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule],
  providers: [DialogService, DynamicDialogRef,],
  templateUrl: './employee-leave.component.html',
  styleUrl: './employee-leave.component.scss'
})
export class EmployeeLeaveComponent extends Crud {
  module = 'Bajas'
  icon = 'pi-angle-double-down'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Bajas'
  dialogConfig: DynamicDialogConfig;
  data = [
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
  }

  protected getRefDialog() {
    return this.dialogService.open(EmployeeLeaveDialogComponent, this.dialogConfig)
  }

  protected restore(){
    
  }
}
