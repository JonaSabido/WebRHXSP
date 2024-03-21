import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, NgForm } from '@angular/forms';
import { DialogCrud } from '../../../../shared/helpers/dialog';
import { AreaResponse } from '../../interfaces/area';
import { AreaService } from '../../core/services/area.service';

@Component({
  selector: 'app-job-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule, DropdownModule, FormsModule],
  templateUrl: './job-dialog.component.html',
  styleUrl: './job-dialog.component.scss'
})
export class JobDialogComponent extends DialogCrud {
  @ViewChild('form') form: NgForm = {} as NgForm;
  areas: AreaResponse[];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private areaService: AreaService
  ) {
    super(ref, config)
    this.areas = []
  }

  ngOnInit() {
    this.areaService.all().subscribe(response => this.areas = response.data)
  }
}
