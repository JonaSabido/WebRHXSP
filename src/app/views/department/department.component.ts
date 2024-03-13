import { Component } from '@angular/core';
import { View } from '../../../../shared/helpers/view';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DepartmentDialogComponent } from '../../dialogs/department-dialog/department-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';


@Component({
  selector: 'app-department',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule],
  providers: [DialogService, DynamicDialogRef,],
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent extends Crud {
  module = 'Departamentos'
  icon = 'pi-building'
  prevLinks = ['Home', 'Empresa']
  activeLink = 'Departamentos'
  dialogConfig: DynamicDialogConfig;
  entities = [
    {
      name: 'IKA'
    },
    {
      name: 'YCC'
    },
    {
      name: 'TULUM'
    },
    {
      name: 'XSP'
    },
  ]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
  ) {
    super(dialogService, refDialog)
    this.dialogConfig = {
      header: 'Nuevo departamento',
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
    return this.dialogService.open(DepartmentDialogComponent, this.dialogConfig)
  }
}
