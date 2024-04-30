import { Component } from '@angular/core';
import { DialogCrud } from '../../../../shared/helpers/dialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DateService } from '../../../../shared/services/date.service';

@Component({
  selector: 'app-absence-chart-dialog',
  standalone: true,
  imports: [TagModule, ButtonModule],
  templateUrl: './absence-chart-dialog.component.html',
  styleUrl: './absence-chart-dialog.component.scss'
})
export class AbsenceChartDialogComponent extends DialogCrud {
  dates: string[]
  startDateFormatted: string
  endDateFormatted: string

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private dateService: DateService
  ) {
    super(ref, config)
    this.startDateFormatted = this.dateService.dateFormatted(new Date(config.data.start_date))
    this.endDateFormatted = this.dateService.dateFormatted(new Date(config.data.end_date))
    this.dates = config.data.dates.split(',')
  }

  ngOnInit() {
  }

  formatDate(date: string): string {
    return this.dateService.dateFormatted(new Date(`${date}T00:00:00`));
  }
}
