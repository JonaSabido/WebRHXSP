import { Component } from '@angular/core';
import { Crud } from '../../../../shared/helpers/crud';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AbsenceDialogComponent } from '../../dialogs/absence-dialog/absence-dialog.component';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-absence',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule],
  providers: [DialogService, DynamicDialogRef,],
  templateUrl: './absence.component.html',
  styleUrl: './absence.component.scss'
})
export class AbsenceComponent extends Crud {
  module = 'Registros'
  icon = 'pi-list'
  prevLinks = ['Home', 'Faltas']
  activeLink = 'Registros'
  dialogConfig: DynamicDialogConfig;
  entities = [
    {
      employee: 'Juan Olmo',
      date: '24 Febrero 2024',
      type: 'PSG'
    },
    {
      employee: 'Maria Rodriguez',
      date: '14 Febrero 2023',
      type: 'PCG'
    },
    {
      employee: 'Maria Rodriguez',
      date: '04 Enero 2024',
      type: 'PSG'
    },
    {
      employee: 'Luis Martinez',
      date: '30 Marzo 2022',
      type: 'PCG'
    },
    {
      employee: 'Luis Martinez',
      date: '31 Agosto 2020',
      type: 'PSG'
    }
  ]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
  ) {
    super(dialogService, refDialog)
    this.dialogConfig = {
      header: 'Nueva falta',
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
    return this.dialogService.open(AbsenceDialogComponent, this.dialogConfig)
  }
}
