import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-job-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule, DropdownModule],
  templateUrl: './job-dialog.component.html',
  styleUrl: './job-dialog.component.scss'
})
export class JobDialogComponent {
  areas = [
    {
      name: 'Operativo',
    },
    {
      name: 'Administrativo'
    }

  ]
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {

  }
  ngOnInit() {
  }

  closeDialog() {
    this.ref.close()
  }
}
