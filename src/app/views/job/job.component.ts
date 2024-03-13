import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { View } from '../../../../shared/helpers/view';
import { JobDialogComponent } from '../../dialogs/job-dialog/job-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule],
  providers: [DialogService, DynamicDialogRef,],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobComponent extends Crud {
  module = 'Trabajos'
  icon = 'pi-briefcase'
  prevLinks = ['Home', 'Empresa']
  activeLink = 'Trabajos'
  dialogConfig: DynamicDialogConfig;
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
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
  ) {
    super(dialogService, refDialog)
    this.dialogConfig = {
      header: 'Nuevo trabajo',
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
    return this.dialogService.open(JobDialogComponent, this.dialogConfig)
  }
}