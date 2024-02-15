import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-area-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule],
  templateUrl: './area-dialog.component.html',
  styleUrl: './area-dialog.component.scss'
})
export class AreaDialogComponent {
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
