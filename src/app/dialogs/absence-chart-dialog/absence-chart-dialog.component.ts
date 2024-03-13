import { Component } from '@angular/core';
import { DialogCrud } from '../../../../shared/helpers/dialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-absence-chart-dialog',
  standalone: true,
  imports: [TagModule, ButtonModule],
  templateUrl: './absence-chart-dialog.component.html',
  styleUrl: './absence-chart-dialog.component.scss'
})
export class AbsenceChartDialogComponent extends DialogCrud {

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    super(ref, config)
  }

  ngOnInit() {
  }
}
