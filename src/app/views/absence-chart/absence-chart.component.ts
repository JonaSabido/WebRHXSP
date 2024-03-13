import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { View } from '../../../../shared/helpers/view';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AbsenceChartDialogComponent } from '../../dialogs/absence-chart-dialog/absence-chart-dialog.component';

@Component({
  selector: 'app-absence-chart',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule],
  providers: [DialogService, DynamicDialogRef],
  templateUrl: './absence-chart.component.html',
  styleUrl: './absence-chart.component.scss'
})
export class AbsenceChartComponent extends View {
  module = 'Estadistica'
  icon = 'pi-chart-bar'
  prevLinks = ['Home', 'Faltas']
  activeLink = 'Estadistica'
  entities = [
    {
      employee: 'Juan Olmo',
      total: 20,
    },
    {
      employee: 'Maria Rodriguez',
      total: 15,

    },
    {
      employee: 'Maria Rodriguez',
      total: 2,

    },
    {
      employee: 'Luis Martinez',
      total: 3,

    },
    {
      employee: 'Luis Martinez',
      total: 5,
    }
  ]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
  ) {
    super()
  }

  openDetail() {
    this.refDialog = this.dialogService.open(AbsenceChartDialogComponent,
      {
        header: 'Desglose de faltas',
        closeOnEscape: false,
        closable: false,
        width: '50%',
        modal: true,
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
        },
      }
    )
  }

}
