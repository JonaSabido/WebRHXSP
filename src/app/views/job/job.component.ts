import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { View } from '../../../../shared/helpers/view';
import { JobDialogComponent } from '../../dialogs/job-dialog/job-dialog.component';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule],
  providers: [DialogService],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobComponent extends View {
  ref: DynamicDialogRef | undefined;
  module = 'Trabajos'
  icon = 'pi-briefcase'
  prevLinks = ['Home', 'Empresa']
  activeLink = 'Trabajos'
  entities = [
    {
      name: 'Guardia de seguridad',
      area: 'Operativo'
    },
    {
      name: 'Auxiliar de Recursos Humanos',
      area: 'Operativo'
    },
    {
      name: 'Monitorista',
      area: 'Operativo',
    },
    {
      name: 'Auxiliar de Finanzas',
      area: 'Administrativo',
    },
    {
      name: 'Coordinadora de Recursos Humanos',
      area: 'Administrativo'
    }
  ]

  constructor(
    public dialogService: DialogService
  ) {
    super()
  }

  show() {
    this.ref = this.dialogService.open(JobDialogComponent,
      {
        header: 'Nuevo trabajo',
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