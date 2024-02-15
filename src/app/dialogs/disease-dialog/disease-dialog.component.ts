import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-disease-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule],
  
  templateUrl: './disease-dialog.component.html',
  styleUrl: './disease-dialog.component.scss'
})
export class DiseaseDialogComponent {
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
