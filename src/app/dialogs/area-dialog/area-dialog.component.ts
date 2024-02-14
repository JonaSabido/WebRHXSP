import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-area-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule],
  templateUrl: './area-dialog.component.html',
  styleUrl: './area-dialog.component.scss'
})
export class AreaDialogComponent {
  id: string = '';
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {

  }

  ngOnInit() {
    this.id = this.config.data.id
  }

  closeDialog() {
    this.ref.close()
  }
}
