import { Component } from '@angular/core';
import { View } from '../../../../shared/helpers/view';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DepartmentDialogComponent } from '../../dialogs/department-dialog/department-dialog.component';


@Component({
  selector: 'app-department',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule],
  providers: [DialogService],
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent extends View {
  ref: DynamicDialogRef | undefined;
  module = 'Departamentos'
  icon = 'pi-building'
  prevLinks = ['Home', 'Empresa']
  activeLink = 'Departamentos'
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
    public dialogService: DialogService
  ) {
    super()
  }

  show() {
    this.ref = this.dialogService.open(DepartmentDialogComponent,
      {
        header: 'Nuevo departamento',
        closeOnEscape: false,
        closable: false,
        width: '50%',
        modal: true,
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
        },
      });
  }
}
